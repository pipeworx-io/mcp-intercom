# mcp-intercom

Intercom MCP Pack — contacts, conversations, companies via OAuth.

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `ic_search_contacts` | Search Intercom contacts (users and leads). |
| `ic_get_contact` | Get an Intercom contact by ID. |
| `ic_list_conversations` | List Intercom conversations. |
| `ic_get_conversation` | Get an Intercom conversation by ID with full message thread. |
| `ic_list_companies` | List Intercom companies. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "intercom": {
      "url": "https://gateway.pipeworx.io/intercom/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use intercom
```

## License

MIT
