import { icons } from "@iconify-json/simple-icons"

export const simpleIconsVariations = (name: string): string | undefined => {
  name = name.toLowerCase()
  for (const [key, value] of Object.entries({
    ["dockerfile"]: "docker",
    ["handlebars"]: "handlebarsdotjs",
    ["shell"]: "iterm2",
    ["nix"]: "nixos",
    ["html"]: "html5",
    ["css"]: "css3",
  })) {
    if (key.includes(name)) {
      name = value
    }
  }
  return name in icons.icons ? name : undefined
}
