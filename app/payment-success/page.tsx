//Simple success page

export default function PaymentSuccess({
    searchParams: { amount },
} : {
    searchParams: {amount: string }
}) {
    return (
        <main className="">
            <div className="mb-10">
                <h1 className="">Thank you</h1>
                <h2 className="">Order total: </h2>
                <div className="">${amount}</div>
            </div>
        </main>
    )
}