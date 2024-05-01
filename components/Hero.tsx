import Image from "next/image"
import heroImg from '../public/heroImg.svg'
import baseWordmark from '../public/wordmark.svg'

export default function Hero() {
    return (
    <>
        <div className="flex flex-col order-2 lg:order-none w-11/12 sm:w-3/4 lg:w-1/2 p-8 lg:p-12 border-b-2 rounded-lg bg-white">
            <h1 className="text-5xl lg:text-6xl md:text-left mb-12 text-center font-secondary">Based Place</h1>
            <p className="flex flex-col text-left text-2xl mb-12">
                <span className="mb-2">
                    There is a based canvas.
                </span>
                <span className="mb-2">
                    Connect your wallet and play
                </span>
                <span className="mb-2">
                    Individually you earn something.
                </span>
                <span className="mb-2">
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
        <div className="w-11/12 sm:w-8/12 lg:w-1/2 order-1 lg:order-none self-center mb-6 sm:mb-12 p-6">
            <Image src={heroImg} alt="hero-image" priority className="w-full" width={500} height={500} />
        </div>
      </>
    )

}