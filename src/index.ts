interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Intercom MCP Pack — contacts, conversations, companies via OAuth.
 */


interface IntercomContext {
  intercom?: { accessToken: string };
}

const API = 'https://api.intercom.io';

async function icFetch(ctx: IntercomContext, path: string, options: RequestInit = {}) {
  if (!ctx.intercom) {
    return { error: 'connection_required', message: 'Connect your Intercom account at https://pipeworx.io/account' };
  }
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${ctx.intercom.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Intercom API error (${res.status}): ${text}`);
  }
  return res.json();
}

const tools: McpToolExport['tools'] = [
  {
    name: 'ic_search_contacts',
    description: 'Search Intercom contacts (users and leads).',
    inputSchema: {
      type: 'object' as const,
      properties: {
        query: { type: 'string', description: 'Search by email, name, or other field' },
      },
      required: ['query'],
    },
  },
  {
    name: 'ic_get_contact',
    description: 'Get an Intercom contact by ID.',
    inputSchema: {
      type: 'object' as const,
      properties: { id: { type: 'string', description: 'Contact ID' } },
      required: ['id'],
    },
  },
  {
    name: 'ic_list_conversations',
    description: 'List Intercom conversations.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        per_page: { type: 'number', description: 'Results per page (default 20)' },
        starting_after: { type: 'string', description: 'Pagination cursor' },
      },
    },
  },
  {
    name: 'ic_get_conversation',
    description: 'Get an Intercom conversation by ID with full message thread.',
    inputSchema: {
      type: 'object' as const,
      properties: { id: { type: 'string', description: 'Conversation ID' } },
      required: ['id'],
    },
  },
  {
    name: 'ic_list_companies',
    description: 'List Intercom companies.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        per_page: { type: 'number', description: 'Results per page (default 20)' },
        page: { type: 'number', description: 'Page number' },
      },
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const context = (args._context ?? {}) as IntercomContext;
  delete args._context;

  switch (name) {
    case 'ic_search_contacts':
      return icFetch(context, '/contacts/search', {
        method: 'POST',
        body: JSON.stringify({
          query: { field: 'email', operator: '~', value: args.query },
        }),
      });
    case 'ic_get_contact':
      return icFetch(context, `/contacts/${args.id}`);
    case 'ic_list_conversations': {
      const params = new URLSearchParams();
      if (args.per_page) params.set('per_page', String(args.per_page));
      if (args.starting_after) params.set('starting_after', args.starting_after as string);
      return icFetch(context, `/conversations?${params}`);
    }
    case 'ic_get_conversation':
      return icFetch(context, `/conversations/${args.id}`);
    case 'ic_list_companies': {
      const params = new URLSearchParams();
      if (args.per_page) params.set('per_page', String(args.per_page));
      if (args.page) params.set('page', String(args.page));
      return icFetch(context, `/companies?${params}`);
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 10 }, provider: 'intercom' } satisfies McpToolExport;
