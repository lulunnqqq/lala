// @ts-nocheck


libs.db_store = async (key: string, value): boolean => {
	await asyncS.setItem(key, JSON.stringify(value))
	return true
}

libs.db_get = async (key: string) => {
	return await asyncS.getItem(key)
}

libs.db_remove = async (key: string): boolean => {
	await asyncS.removeItem(key)
	return true;
}