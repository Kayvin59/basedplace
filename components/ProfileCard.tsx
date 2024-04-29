export default function ProfileCard() {
    return (
        <div className="p-6 flex justify-between">
            <div className="w-48 flex flex-col justify-between items-center p-6 border rounded-lg bg-background hover:bg-footer">
                <span className="mb-8">Pixels minted</span>
                <span className="text-4xl font-bold font-secondary">180</span>
            </div>
            <div className="w-48 flex flex-col justify-between items-center p-6 border rounded-lg bg-background hover:bg-footer">
                <span className="mb-8">VeToken</span>
                <span className="text-4xl font-bold font-secondary">0.5</span>
            </div>
            <div className="w-48 flex flex-col justify-between items-center p-6 border rounded-lg bg-background hover:bg-footer">
                <span className="mb-8">Votes</span>  
                <span className="text-4xl font-bold font-secondary">15</span>
            </div>
        </div>
    )
}