"use client";

import React from "react";
import ReactFlow, {
    Node,
    Edge,
    Background,
    Controls,
    MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import {
    GraduationCap as FaUserGraduate,
    Briefcase as FaUserTie,
    Settings as FaCogs,
    School as FaUniversity,
    Check,
} from "lucide-react";

const cardStyle = {
    background: "#0f1115",
    color: "#e5e7eb",
    borderRadius: 16,
    padding: 16,
    border: "1px solid #1f2937",
    width: 300,
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
};

const nodes: Node[] = [
    {
        id: "student",
        position: { x: 0, y: 100 },
        data: {
            label: (
                <div
                    className="flex items-center justify-between"
                    style={cardStyle}
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FaUserGraduate className="w-5 h-5 text-blue-400" />
                            <h4 className="font-semibold text-white">
                                Student Portal
                            </h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                            A smart portal for students to manage and track
                            their study abroad journey.
                        </p>
                        <ul className="text-sm space-y-1 text-gray-300">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Upload common documents
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Shortlist and compare courses
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Get AI-based course matches
                            </li>
                        </ul>
                    </div>
                    <FaUserGraduate className="w-16 h-16 text-blue-800 opacity-40" />
                </div>
            ),
        },
        style: cardStyle,
    },
    {
        id: "agent",
        position: { x: 0, y: 350 },
        data: {
            label: (
                <div
                    className="flex items-center justify-between"
                    style={cardStyle}
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FaUserTie className="w-5 h-5 text-emerald-400" />
                            <h4 className="font-semibold text-white">
                                Agent Portal
                            </h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                            Streamlined tools for agencies to handle student
                            applications efficiently.
                        </p>
                        <ul className="text-sm space-y-1 text-gray-300">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Manage student profiles
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Track application progress
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Customize agency branding
                            </li>
                        </ul>
                    </div>
                    <FaUserTie className="w-16 h-16 text-emerald-800 opacity-40" />
                </div>
            ),
        },
        style: cardStyle,
    },
    {
        id: "admin",
        position: { x: 400, y: 230 },
        data: {
            label: (
                <div
                    className="flex items-center justify-between"
                    style={cardStyle}
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FaCogs className="w-5 h-5 text-purple-400" />
                            <h4 className="font-semibold text-white">
                                Admin Panel
                            </h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                            The central command to manage users, institutions,
                            and global operations.
                        </p>
                        <ul className="text-sm space-y-1 text-gray-300">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Control all portals
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Monitor analytics
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Automate tasks
                            </li>
                        </ul>
                    </div>
                    <FaCogs className="w-16 h-16 text-purple-800 opacity-40" />
                </div>
            ),
        },
        style: cardStyle,
    },
    {
        id: "university",
        position: { x: 850, y: 230 },
        data: {
            label: (
                <div
                    className="flex items-center justify-between"
                    style={cardStyle}
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FaUniversity className="w-5 h-5 text-yellow-400" />
                            <h4 className="font-semibold text-white">
                                University Portal
                            </h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                            The destination for universities to receive and
                            manage student applications.
                        </p>
                        <ul className="text-sm space-y-1 text-gray-300">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Review & accept applications
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Communicate directly
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Manage offers digitally
                            </li>
                        </ul>
                    </div>
                    <FaUniversity className="w-16 h-16 text-yellow-800 opacity-40" />
                </div>
            ),
        },
        style: cardStyle,
    },
];

const edges: Edge[] = [
    { id: "student-admin", source: "student", target: "admin", animated: true },
    { id: "agent-admin", source: "agent", target: "admin", animated: true },
    {
        id: "admin-university",
        source: "admin",
        target: "university",
        animated: true,
    },
];

const GraphSection: React.FC = () => {
    return (
        <div className="w-full h-[700px] bg-[#0b0d10] rounded-2xl shadow-2xl">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                nodesDraggable={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                panOnDrag={false}
            >
                <Background color="#1f2937" gap={20} />
                <MiniMap nodeColor={() => "#1f2937"} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
};

export default GraphSection;
