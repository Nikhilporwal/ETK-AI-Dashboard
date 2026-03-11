import Image from "next/image"
import Link from "next/link"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#F8F9FC]">

            {/* Header */}
            <div className="flex items-center justify-between px-10 py-6">

                <Link href="/">
                    <Image
                        src="/images/logo-with-name.png"
                        alt="GlobalWise"
                        width={140}
                        height={40}
                        priority
                    />
                </Link>
            </div>

            {/* Content */}
            <div className="max-w-[900px] mx-auto px-8 pb-20">

                <h1 className="text-3xl font-bold text-[#1B1E3D] mb-8">
                    Terms and Conditions
                </h1>

                <div className="space-y-6 text-[15px] leading-7 text-slate-600">

                    <p>
                        Welcome to GlobalWise. By accessing or using our platform,
                        you agree to comply with these Terms and Conditions.
                    </p>

                    <p>
                        These terms govern your use of the website and services
                        provided by GlobalWise.
                    </p>

                    <h2 className="font-semibold text-[#1B1E3D] pt-6">
                        Use of Services
                    </h2>

                    <p>
                        Users must use the platform only for lawful purposes
                        and must not misuse or attempt to disrupt the services.
                    </p>

                    <h2 className="font-semibold text-[#1B1E3D] pt-6">
                        User Responsibilities
                    </h2>

                    <ul className="list-disc pl-6 space-y-3">

                        <li>
                            Users must provide accurate and current information.
                        </li>

                        <li>
                            Users are responsible for maintaining account security.
                        </li>

                        <li>
                            Misuse of the platform may lead to suspension
                            or termination of access.
                        </li>

                    </ul>

                    <p>
                        By continuing to use GlobalWise services, you confirm
                        that you accept these Terms and Conditions.
                    </p>

                </div>
            </div>

        </div>
    )
}