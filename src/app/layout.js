import { Geist, Geist_Mono, Inter, Orbitron } from "next/font/google";
import "@/styles/globals.css";
import "@/app/globals.css";
import DesktopNotSupported from "../component/ui/DesktopNotSupported.jsx";
import MainProvider from "../component/providers/MainProvider.jsx";


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-primary",
	subsets: ["latin"],
});

const orbitron = Orbitron({
	variable: "--font-orbitron",
	subsets: ["latin"],
	weight: "500",
});

export const metadata = {
	title: "Grub Guest",
	description: "GrubHospitality-Guest management System.",
	icons: {
		icon: "/logomark.svg",
	},
};

export default function RootLayout({
	children,
}) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${orbitron.variable} antialiased`}
			>
				<MainProvider>
					<DesktopNotSupported>
						{children}
					</DesktopNotSupported>
				</MainProvider>
			</body>
		</html>
	);
}
