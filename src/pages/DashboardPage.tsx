import { StarField } from "@/components/StarField";
import { UserNavbar } from "@/components/UserNavbar";
import { CareerTimeline } from "@/components/CareerTimeline";
import { Dashboard } from "@/components/Dashboard";
import { GpaTracker } from "@/components/student/GpaTracker";
import { motion } from "framer-motion";

const DashboardPage = () => {
    return (
        <div className="relative min-h-screen overflow-x-hidden pt-20">
            {/* Background */}
            <StarField />

            {/* Navigation */}
            <UserNavbar />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 space-y-12">

                {/* Timeline Visualization */}
                <section className="py-10">
                    <CareerTimeline />
                </section>

                {/* GPA & Profile Stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <GpaTracker />
                    </div>
                    {/* Can add more profile widgets here later */}
                </section>

                {/* Main Dashboard (Reality Tree etc.) */}
                <Dashboard />

            </div>
        </div>
    );
};

export default DashboardPage;
