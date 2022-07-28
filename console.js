export function logArray(arr) {
	arr.forEach(x => console.log(x))
}

export function logHeading(heading) {
  const headingSeperator = "=".repeat(heading.length)
  console.log(headingSeperator)
  console.log(heading)
  console.log(headingSeperator)
}

export async function logBlock(heading, block) {
  logHeading(heading)

  await block();

  const blockEnder = "-".repeat(heading.length)
  console.log(blockEnder)
}

export function logSpace(x = 1) {
  if(x <= 0)
    return;

  for(var i = 0; i < x; i++)
    console.log("")
}
