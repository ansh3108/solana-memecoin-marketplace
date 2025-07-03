export function getSafeLogoURI(uri?: string): string {
    if (!uri) return "/assets/default-token.png"
    if (uri.startsWith("ipfs://")){
        return uri.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
    }

    if (uri.startsWith("http://")) {
        return uri.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
    }

    if (uri.startsWith("http://")) {
        return uri.replace("http://", "https://");
  }

  return uri
}