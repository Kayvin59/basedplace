import { Button } from '@/components/ui/button';

export default function ActionPanel() {
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-evenly mb-16">
            <div className="w-11/12 sm:w-3/4 lg:w-1/3 p-6 mb-6 sm:mb-12 lg:mb-0 bg-white rounded-md text-center border">
                <h1 className='mb-6 text-6xl font-secondary'>
                    Play
                </h1>
                <div className='mb-6'>
                    <p>Join the movement!</p>
                    <p>Bring and build your community.</p>
                    <p>Unleash your creativity in this unique experiment</p>
                </div>
                <Button className='text-lg w-2/3 bg-footer hover:cursor-not-allowed hover:bg-foreground'>Get started</Button>
            </div>
            <div className="w-11/12 sm:w-3/4 lg:w-1/3 p-6 flex flex-col items-center bg-white rounded-md text-center border">
                <h1 className='mb-6 text-6xl font-secondary'>
                    Learn
                </h1>
                <div className='mb-6'>
                    <p>
                        Newcomers, degens, artists
                    </p>
                    <p>Navigate through our docs and blog to learn about our journey </p>
                </div>
                <Button className='text-lg w-2/3 bg-footer lg:self-center mt-auto hover:cursor-not-allowed hover:bg-foreground'>Learn more</Button>
            </div>
        </div>
    )
}
