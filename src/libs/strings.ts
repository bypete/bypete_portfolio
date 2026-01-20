export function truncate(str: string, limit: number): string {
	return str.split(" ").splice(0, limit).join(" ");
}
