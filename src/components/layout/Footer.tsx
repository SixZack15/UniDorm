export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">

                {/* Info */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Van Lang University Dormitory</h3>
                    <p>69/68 Dang Thuy Tram, Ward 13, Binh Thanh Dist, HCMC</p>
                    <p className="mt-2">© 2025 VLU. All rights reserved.</p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-gray-900 mb-2">Quick Links</h3>
                    <a href="#" className="hover:text-primary transition-colors">Internal Rules</a>
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-2">Emergency Support</h3>
                    <p className="flex items-center gap-2">
                        <span className="font-bold text-red-600">Hotline:</span>
                        <span className="text-lg font-bold text-gray-900">028.710.99221</span>
                    </p>
                    <p className="mt-2">Support: support@vlu.edu.vn</p>
                </div>

            </div>
        </footer>
    );
}
