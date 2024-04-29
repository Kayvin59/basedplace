import { Button } from '@/components/ui/button';

export default function ActionPanel() {
    return (
        <div className="flex justify-evenly mb-16">
            <div className="w-1/3 p-6 bg-white rounded-md text-center border">
                <h2 className='mb-6 text-2xl font-secondary'>
                    Play
                </h2>
                <p className='mb-6'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo ducimus corporis aperiam voluptate adipisci quos?
                </p>
                <Button className='w-2/3 bg-footer'>CTA</Button>
            </div>
            <div className="w-1/3 p-6 bg-white rounded-md text-center border">
                <h2 className='mb-6 text-2xl font-secondary'>
                    Earn
                </h2>
                <p className='mb-6'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo ducimus corporis aperiam voluptate adipisci quos?
                </p>
                <Button className='w-2/3 bg-footer'>CTA</Button>
            </div>
        </div>
    )
}