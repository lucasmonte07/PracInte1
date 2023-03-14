
export const getManagerProducts = async () => {
    const modelProduct = process.env.SELECTEDDB === 1 ? await import('../dao/models/MongoDB/models/Product.js') : 
    await import('../dao/models/PostgresSQL/models/Product.js')
    return modelProduct
}

export const getManagerMessage = async () => {
    const modelMessage = process.env.SELECTEDDB === 1 ? await import('..dao/models/MongoDB/models/Message.js') : 
    await import('../dao/models/PostgresSQL/models/Message.js')
    return modelMessage
}