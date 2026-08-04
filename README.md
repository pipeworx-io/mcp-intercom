# mcp-intercom

Intercom MCP Pack — contacts, conversations, companies via OAuth.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `ic_search_contacts` | Search for contacts by name, email, or custom attributes. Returns contact ID, name, email, and metadata. |
| `ic_get_contact` | Get full contact details by ID. Returns name, email, phone, attributes, tags, and conversation history. |
| `ic_list_conversations` | List conversations with pagination. Returns conversation ID, participants, status, created date, and last message preview. |
| `ic_get_conversation` | Get complete conversation thread by ID. Returns all messages, timestamps, participants, and metadata. |
| `ic_list_companies` | List companies with pagination. Returns company ID, name, website, employee count, and custom attributes. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "intercom": {
      "url": "https://gateway.pipeworx.io/intercom/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Intercom data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
