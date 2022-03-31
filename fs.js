import { readdirSync, existsSync } from 'fs'

export function getDirectories(source, showHidden = false) {
	return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(x => showHidden || !isHidden(x))
}

export function getFiles(source, showHidden = false) {
	return readdirSync(source, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(x => showHidden || !isHidden(x))
}

export function isHidden(x) {
  return x.startsWith(".")
}

export function fileExists(path) {
  return existsSync(path)
}
export function pathJoin(...paths) {
  return paths.join("/")
}
