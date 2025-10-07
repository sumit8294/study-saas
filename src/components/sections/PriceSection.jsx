import React from "react";

const PricingSection = () => {
    const primaryColor = "#00ed64";

    return (
        <>
            {/* Header Section */}
            <section
                className="py-8 lg:py-12 bg-primary"
                style={{ backgroundColor: primaryColor }}
            >
                <div className="container mx-auto px-4">
                    {/* Page header */}
                    <div className="flex flex-col items-center">
                        <div className="w-full lg:w-8/12 xl:w-6/12">
                            <div className="text-center mb-6 px-0 md:px-8">
                                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                    Simple pricing that scales with your
                                    business
                                </h1>
                                <p className="text-white text-lg md:text-xl mb-6">
                                    Streamline your student recruitment with
                                    flexible plans designed for education
                                    agencies of all sizes.
                                </p>
                                {/* Switch Toggle */}
                                <div className="flex justify-center items-center">
                                    <span className="text-white mr-2">
                                        Monthly
                                    </span>
                                    <div className="relative inline-block w-12 mr-2 align-middle select-none">
                                        <input
                                            type="checkbox"
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                            defaultChecked
                                            style={{
                                                borderColor: primaryColor,
                                            }}
                                        />
                                        <label
                                            className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                                            style={{
                                                backgroundColor: primaryColor,
                                            }}
                                        ></label>
                                    </div>
                                    <span className="text-white ml-2">
                                        Yearly
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards Section */}
            <section className="mt-[-2rem] pb-16">
                <div className="container mx-auto px-4 flex justify-center">
                    <div className="grid grid-cols-1 max-w-7xl lg:grid-cols-3 gap-6 ">
                        {/* Starter Plan */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
                                {/* Card body */}
                                <div className="p-6 text-center">
                                    <div
                                        className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${primaryColor}20`,
                                        }}
                                    >
                                        <svg
                                            className="w-8 h-8"
                                            style={{ color: primaryColor }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mb-5">
                                        <h2 className="text-xl font-bold mb-2">
                                            Starter
                                        </h2>
                                        <p className="text-gray-600">
                                            Perfect for individual agents
                                            starting their recruitment journey
                                            with basic platform access.
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-end mb-4">
                                        <span className="text-2xl font-bold">
                                            $
                                        </span>
                                        <div className="text-4xl font-bold mx-1">
                                            0
                                        </div>
                                        <span className="text-gray-500 mb-1">
                                            /Yearly
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <button
                                            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                            style={{
                                                borderColor: primaryColor,
                                                color: primaryColor,
                                            }}
                                        >
                                            Get Started for Free
                                        </button>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className="p-6">
                                    <h4 className="font-bold mb-4 text-gray-900">
                                        All core features, including:
                                    </h4>
                                    {/* List */}
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                Up to 50 student applications
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                Basic student portal access
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                <span className="font-bold text-dark">
                                                    5GB{" "}
                                                </span>
                                                document storage
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                Basic analytics dashboard
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>Mobile app access</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>Email support</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Individual Plan */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-4 lg:mb-0">
                                {/* Card body */}
                                <div className="p-6 text-center">
                                    <div
                                        className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${primaryColor}20`,
                                        }}
                                    >
                                        <svg
                                            className="w-8 h-8"
                                            style={{ color: primaryColor }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mb-5">
                                        <h2 className="text-xl font-bold mb-2">
                                            Professional
                                        </h2>
                                        <p className="text-gray-600">
                                            For growing agencies needing
                                            advanced features and higher
                                            application volumes.
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-end mb-4">
                                        <span className="text-2xl font-bold">
                                            $
                                        </span>
                                        <div className="text-4xl font-bold mx-1">
                                            99
                                        </div>
                                        <span className="text-gray-500 mb-1">
                                            /Yearly
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <button
                                            className="w-full py-2 px-4 rounded-lg text-white transition-colors"
                                            style={{
                                                backgroundColor: primaryColor,
                                            }}
                                        >
                                            Get Monthly Access
                                        </button>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className="p-6">
                                    <h4 className="font-bold mb-4 text-gray-900">
                                        Everything in Starter, plus:
                                    </h4>
                                    {/* List */}
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                Up to 500 student applications
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>Advanced student portal</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                <span className="font-bold">
                                                    Unlimited{" "}
                                                </span>
                                                document storage
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>Custom domain support</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                Bulk application processing
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                Priority email & chat support
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Team Plan */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 lg:mb-0">
                                {/* Card body */}
                                <div className="p-6 text-center">
                                    <div
                                        className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${primaryColor}20`,
                                        }}
                                    >
                                        <svg
                                            className="w-8 h-8"
                                            style={{ color: primaryColor }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mb-5">
                                        <h2 className="text-xl font-bold mb-2">
                                            Enterprise
                                        </h2>
                                        <p className="text-gray-600">
                                            For large agencies with multiple
                                            team members and unlimited
                                            recruitment needs.
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-end mb-4">
                                        <span className="text-2xl font-bold">
                                            $
                                        </span>
                                        <div className="text-4xl font-bold mx-1">
                                            199
                                        </div>
                                        <span className="text-gray-500 mb-1">
                                            /Yearly
                                        </span>
                                    </div>
                                    <div className="w-full">
                                        <button
                                            className="w-full py-2 px-4 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                            style={{
                                                borderColor: primaryColor,
                                                color: primaryColor,
                                            }}
                                        >
                                            Get Team Access
                                        </button>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className="p-6">
                                    <h4 className="font-bold mb-4 text-gray-900">
                                        Everything in Professional, plus:
                                    </h4>
                                    {/* List */}
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                Unlimited student applications
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                <span className="font-bold">
                                                    Multi-team{" "}
                                                </span>
                                                access
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                <span className="font-bold">
                                                    99.9% uptime{" "}
                                                </span>
                                                guarantee
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                Advanced analytics & reporting
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                API access & custom integrations
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">
                                                ✓
                                            </span>
                                            <span>
                                                24/7 dedicated phone support
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingSection;
