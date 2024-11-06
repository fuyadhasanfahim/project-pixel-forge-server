interface IOrders {
    invoiceNumber: string
    userId: string
    username: string
    name: string
    email: string
    profileImage: string
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
    folderUrl?: string
    imagesLink: string
    pricePerImage?: string
    images: string
    totalPrice?: string
    customerId: string
    orderName?: string
}

export default IOrders
