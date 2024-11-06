import React from "react"
const name = import.meta.env.VITE_AUTHOR_NAME || 'Yannan Zhang'

const Info = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-blue-600">MyNote</h1>
                <h2 className="text-xl text-gray-500">Version 1.0</h2>
            </header>

            {/* Author and Description */}
            <div className="mb-6">
                <p className="text-lg font-semibold"><span className="text-gray-700">Author: {name}</span></p>
                <p className="text-sm text-gray-600 mt-1">This project is designed to organize notes efficiently with various features like tag modification, calendar-based stats, and more.</p>
            </div>

            {/* Project Links */}
            <section className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Useful Links</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>
                        <a href="https://github.com/Nancheung23/MyNote.git" className="text-blue-500 hover:underline">Project on GitHub</a>
                    </li>
                    <li>
                        <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/" className="text-blue-500 hover:underline">Array Methods Guide on MDN</a>
                    </li>
                    <li>
                        <a href="https://tailwindui.com/documentation#react-creating-components" className="text-blue-500 hover:underline">Tailwind Docs for React</a>
                    </li>
                    <li>
                        <a href="https://codesandbox.io/examples/package/react-beautiful-dnd" className="text-blue-500 hover:underline">React-beautiful-dnd Examples</a>
                    </li>
                </ul>
            </section>

            {/* AI Usage */}
            <section className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Usage</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Debugging assistance</li>
                    <li>Guidance on using Tailwind CSS</li>
                    <li>Instructions for Chart.js integration</li>
                    <li>Calendar component customization</li>
                    <li>Troubleshooting missing keys and Fit component warnings</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">Work Hours: <strong>58 hrs</strong></p>
            </section>

            {/* Challenges */}
            <section className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Challenges Faced</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Modifying tags and avoiding duplicates</li>
                    <li>Validation for invalid tags and debugging</li>
                    <li>Creating a chart of completed tasks using Chart.js</li>
                    <li>Customize a hook, and apply it to all views</li>
                </ul>
            </section>

            {/* Development Logs */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Development Logs</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm max-h-64 overflow-y-auto">
                    <li>10/29: Project started</li>
                    <li>10/29: Retrieved initial data from database</li>
                    <li>10/29: Fetched all tasks and combined them into a single view</li>
                    <li>10/29: Successfully tested template task creation</li>
                    <li>10/29: Basic router setup</li>
                    <li>10/30: Created .env for Vite & React, defined base URL</li>
                    <li>10/30: Structured app routers</li>
                    <li>10/31: Set up navbar with Overview, TaskCreation, Statistics, Settings, Logs</li>
                    <li>11/1: Extracted note display component, displayed tasks in Overview; initiated Info page</li>
                    <li>11/1: Organized assets, imported styles</li>
                    <li>11/4: Integrated Tailwind, added Calendar component</li>
                    <li>11/5: Managed timestamps, added toggle button, posted new timestamps</li>
                    <li>11/5: Implemented TaskCreation, added Toast notifications, extracted getNotes()</li>
                    <li>11/5: Added update & delete functionalities and tag removal, adjusted PUT in Overview.jsx</li>
                    <li>11/6: Resolved tag update issues in unrelated notes</li>
                    <li>11/6: Added tag filtering for notes</li>
                    <li>11/6: Implemented task name modification</li>
                    <li>11/6: Added delete functionality for notes</li>
                    <li>11/6: Implemented duplicate tag verification in notes</li>
                    <li>11/6: Added DateTimePicker for time intervals and made UI adjustments</li>
                    <li>11/6 - deadline: Added customized hook: useTheme; Modified SettingsView.jsx; implement themes for all views</li>
                </ul>
            </section>
        </div>
    )
}

export default Info
