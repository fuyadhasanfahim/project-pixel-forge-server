interface IOrders {
    userId: string
    username: string
    services: string[]
    complexities: Record<string, string>
    instructions: string
    outputFormat: string
    deliveryDate: string
    status:
        | 'pending'
        | 'inprogress'
        | 'delivered'
        | 'completed'
        | 'revision'
        | 'canceled'
        | 'request for additional information'
    paymentStatus: 'pending' | 'paid'
    folderUrl: string
    images: string
    imageUrls: string[]
}

export default IOrders
