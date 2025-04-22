import Link from 'next/link';
import Image from 'next/image';
import { shadowsIntoLightTwo, newRocker } from '@/app/ui/fonts';

export default function Footer() {
    return (
        <footer className="w-full bg-white py-12 border-t border-gray-200">
            <div className="px-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Left - Copyright */}
                    <div className="md:w-1/3 text-center md:text-left mb-6 md:mb-0">
                        <p className={`${shadowsIntoLightTwo.className} text-gray-500 text-2xl`}>
                            © 2025 HaunterShop. All rights reserved.
                        </p>
                    </div>

                    {/* Center - Social Media Icons */}
                    <div className="md:w-1/3 flex justify-center items-center">
                        <div className="flex gap-8">
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                                <div className="relative w-10 h-10">
                                    <Image 
                                        src="/instagram.png" 
                                        alt="Instagram"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                                <div className="relative w-10 h-10">
                                    <Image 
                                        src="/twitter.png" 
                                        alt="Twitter/X"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </Link>
                            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                                <div className="relative w-10 h-10">
                                    <Image 
                                        src="/facebook.png" 
                                        alt="Facebook"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right - Phone Number */}
                    <div className="md:w-1/3 text-center md:text-right mt-6 md:mt-0">
                        <p className={`${shadowsIntoLightTwo.className} text-gray-500 text-2xl`}>
                            📞 +62 812-3456-7890
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}