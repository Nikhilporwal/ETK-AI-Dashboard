import Image from "next/image"
import Link from "next/link"

export default function PrivacyPolicy() {
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
                    Privacy Policies
                </h1>

                <div className="space-y-6 text-[15px] leading-7 text-slate-600">

                    <p>
                        At GlobalWise, we respect your privacy and are committed to
                        protecting the personal information you share with us...
                    </p>

                    <p>
                        We may collect personal details such as your name, email
                        address, phone number, and other relevant information
                        required to provide our services effectively.
                    </p>

                    <p>
                        GlobalWise ensures that all personal data is stored securely
                        and handled with strict confidentiality.
                    </p>

                    <h2 className="font-semibold text-[#1B1E3D] pt-6">
                        Data Protection
                    </h2>

                    <p>
                        We implement appropriate security measures to protect
                        personal data from unauthorized access or disclosure.
                    </p>

                    <h2 className="font-semibold text-[#1B1E3D] pt-6">
                        Third-Party Services
                    </h2>

                    <ul className="list-disc pl-6 space-y-3">
                        <li>
                            Third-party platforms may collect their own data based
                            on their privacy policies.
                        </li>

                        <li>
                            Users should review external privacy policies before
                            providing personal information.
                        </li>
                    </ul>

                    <p>
                        By using GlobalWise services, you agree to the terms
                        described in this Privacy Policy.
                    </p>

                </div>
            </div>

        </div>
    )
}