"use client";

import React from "react";
import ReactFlow, { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import {
    GraduationCap as FaUserGraduate,
    Briefcase as FaUserTie,
    Settings as FaCogs,
    School as FaUniversity,
    Check,
} from "lucide-react";

const cardStyle = {
    background: "#061621",
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
                        <div className="flex items-center text-start gap-2 mb-2">
                            <FaUserGraduate className="w-5 h-5 text-blue-400" />
                            <h4 className="font-semibold text-white">
                                Student Portal
                            </h4>
                        </div>
                        <p className="text-gray-400  text-start text-sm mb-3">
                            A portal for students to manage their study abroad
                            journey.
                        </p>
                        <ul className="text-xs space-y-1 text-start  text-gray-300">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Upload common documents
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Shortlist courses
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-400" />
                                Get AI-based course matches
                            </li>
                        </ul>
                    </div>
                    <FaUserGraduate className="w-32 h-32 text-blue-800 opacity-40" />
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
                        <p className="text-gray-400 text-start text-sm mb-3">
                            Streamlined tools for agencies to handle student
                            applications.
                        </p>
                        <ul className="text-xs space-y-1 text-gray-300">
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
                    <FaUserTie className="w-32 h-32 text-emerald-800 opacity-40" />
                </div>
            ),
        },
        style: cardStyle,
    },
    {
        id: "admin",
        position: { x: 370, y: 230 },
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
                        <p className="text-gray-400 text-start text-sm mb-3">
                            The central command to manage users, institutions,
                            and global operations.
                        </p>
                        <ul className="text-xs space-y-1 text-gray-300">
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
                    <FaCogs className="w-32 h-32 text-purple-800 opacity-40" />
                </div>
            ),
        },
        style: cardStyle,
    },
    {
        id: "university",
        position: { x: 750, y: 230 },
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
                        <p className="text-gray-400 text-start text-sm mb-3">
                            The destination for universities to manage student
                            applications.
                        </p>
                        <ul className="text-xs space-y-1 text-gray-300">
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
                    <FaUniversity className="w-32 h-32 text-yellow-800 opacity-40" />
                </div>
            ),
        },
        style: cardStyle,
    },
];

const edges: Edge[] = [
    {
        id: "student-admin",
        source: "student",
        target: "admin",
        animated: true,
        style: {
            stroke: "#8b5cf6",
            strokeWidth: 2,
        },
    },
    {
        id: "student-university",
        source: "student",
        target: "university",
        animated: true,
        style: {
            stroke: "yellow",
            strokeWidth: 3.5,
            strokeDasharray: "5,5",
        },
    },
    {
        id: "agent-university",
        source: "agent",
        target: "university",
        animated: true,
        style: {
            stroke: "yellow",
            strokeWidth: 3.5,
            strokeDasharray: "5,5",
        },
    },
    {
        id: "agent-admin",
        source: "agent",
        target: "admin",
        animated: true,
        style: {
            stroke: "#8b5cf6",
            strokeWidth: 2,
        },
    },
    {
        id: "admin-university",
        source: "admin",
        target: "university",
        animated: true,
        style: {
            stroke: "#8b5cf6",
            strokeWidth: 3,
        },
    },
];

const GraphSection: React.FC = () => {
    return (
        <>
            <div className="w-full h-[300] sm:h-[400] md:h-[500] lg:h-[800px] relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                    nodesDraggable={false}
                    selectionOnDrag={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    panOnDrag={false}
                    panOnScroll={false}
                    style={{
                        background: "transparent",
                    }}
                    className="!bg-transparent"
                />
            </div>
            <div
                className="absolute inset-0 pointer-events-auto"
                style={{ background: "transparent" }}
            />
        </>
    );
};

export default GraphSection;
