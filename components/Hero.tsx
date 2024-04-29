import Image from "next/image"
import heroImg from '../public/hero.svg'
import baseWordmark from '../public/wordmark.svg'

export default function Hero() {
    return (
    <>
        <div className="flex flex-col w-1/2 p-12 border-b-2 rounded-lg bg-white">
            <h1 className="text-6xl text-left mb-12 font-secondary">Based Place</h1>
            <p className="flex flex-col text-left text-xl mb-12">
                <span className="mb-1">
                    There is a based canvas.
                </span>
                <span className="mb-1">
                    Connect your wallet and play
                </span>
                <span className="mb-1">
                    Individually you earn something.
                </span>
                <span className="mb-1">
                    Together you earn more.
                </span>
            </p>
            <p className="flex text-xl mt-auto">
                Powered by 
                <span className="ml-2">
                    <Image src={baseWordmark} alt="base wordmark" width={25} height={25} className="w-auto h-6"/>
                </span>
            </p>
        </div>
        <div className="w-1/2">
            <Image src={heroImg} alt="hero-image" className="w-full" width={500} height={500} />
        </div>
      </>
    )

}