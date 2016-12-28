export const selectFramework = (framework) => {
	return{
		type: 'FRAMEWORK_CHOSEN',
		payload: framework
	}
}

export const selectDatabase = (database) => {
	return {
		type: 'DATABASE_CHOSEN',
		payload: database
	}
}