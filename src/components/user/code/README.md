# RemoteCode Component

The most basic usage looks like:

```astro
import RemoteCode from "@components/astro/code/RemoteCode.astro"

<RemoteCode url="example.com/code.rs" lang="rust" />
```

This will fetch and display the code from the given URL and cache it.

## Specifying lines to display

To only display certain lines you can pass a `lines` prop or use the Github style URL fragment

```astro
<RemoteCode url="https://example.com/code.rs" lang="rust" lines="L5-10" />
<RemoteCode url="https://example.com/code.rs#L5-10" lang="rust" />
```

To display multiple line ranges you can pass in an array of `Line` objects `{start: number, end: number}`

```astro
<RemoteCode url="https://example.com/code.rs" lang="rust" lines={[{start: 5, end: 10}, {start: 15, end: 20}]} />
```

By default if a line range is outside of the content boundaries, or is impossible (end before start)
the component will try to gracefully handle it by adjusting the lines to valid ranges. If you would
prefer for it to throw an error then set `strict` to `true`

```astro
<RemoteCode url="https://example.com/code.rs#L15-10" lang="rust" strict={true} />
```

It will also support asciidoc style tags, but they're a WIP atm.

## Diff'ing against another file

Diff'ing is disabled by default, but you can enable it by passing in a URL to diff against. For example your
main URL could point at code from a particular commit hash, and the diff URL could point at the branch HEAD

```astro
<RemoteCode url="https://example.com/foo/code.rs" lang="rust" diff={{url: "https://example.com/bar/code.rs"}} />
```

By default it will compare the all lines in each file, but you can limit to only those lines you have selected.

```astro
<RemoteCode url="https://example.com/foo/code.rs"
    lang="rust"
    lines="L5-10"
    diff={{url: "https://example.com/bar/code.rs", contentToDiff: "LINES"}}
/>
```

Any differences in the two version of the code will throw an error and fail the build, however if you only want it to
warn on differences you can change the diff level

```astro
<RemoteCode url="https://example.com/foo/code.rs"
    lang="rust"
    lines="L5-10"
    diff={{url: "https://example.com/bar/code.rs", contentToDiff: "LINES", level: "WARN"}}
/>
```

## Caching

By default the RemoteCode component will cache the content fetched. The TTL for the cache is:

- 10s if doing a production build
- 1hr during development

The cache uses a hash of the URL as the ID for the cached content. So as long as the URL is the same even other instances
of the RemoteCode component will use the cached content. NB: the ID is a hash of the complete URL, so if you use the
GitHub fragment syntax to specify lines it might cause cache misses where it really shouldn't.
Use the `lines` prop where possible to be safe.

The same cache is used for storing diff content.

You can overwrite the default cache settings using the `cache` prop.

```astro
<RemoteCode url="https://example.com/foo/code.rs"
    lang="rust"
    lines="L5-10"
    cache:{{ path: '/my/custom/cache/db' ttl: 60 * 60 * 24 * 365 * 1000 }}
/>
```

## Globally disabling cache and/or diff'ing

If you want to disable cache and/or diff'ing you can set the environment variables:

```bash
REMOTE_CODE_CACHE_DISABLED=1
REMOTE_CODE_DIFF_DISABLED=1
```

This can be useful during development if you want to quickly disable caching or diffing without needing to
modify the props on every component instance.

## Stripping comment markers from start of lines

You may want to include code examples which are in docstrings or similar code comments. If we display them as-is within
the a `<Code />` component they will not receive syntax highlighting. So we can optionally strip comment markers from
the start of remote code.

```astro
<RemoteCode url="https://example.com/foo/code.rs"
    lang="rust"
    lines="L5-10"
    stripCommentMarkers={true}
/>
```

It uses the regex `/(?:#|\/\/!?|\/?\*)\s/` by default which will strip "# ", "// ", "//! ", "/// ", and "\* "
from the start of lines. But you can also pass your own regex if needed as the prop `commentMarkersRegEx`
