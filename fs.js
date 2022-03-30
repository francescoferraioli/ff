import { readdirSync } from 'fs'

export function getDirectories(source, showHidden = false) {
	return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(x => showHidden || !isHidden(x))
}

export function isHidden(x) {
  return x.startsWith(".")
}