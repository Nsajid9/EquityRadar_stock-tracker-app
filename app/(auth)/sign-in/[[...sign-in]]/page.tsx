import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/50 to-orange-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <SignIn 
            appearance={{
              elements: {
                card: "bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl",
                headerTitle: "text-zinc-100 font-bold",
                headerSubtitle: "text-zinc-400",
                socialButtonsBlockButton: "border-white/10 bg-zinc-900 hover:bg-zinc-800 text-zinc-300",
                socialButtonsBlockButtonText: "text-zinc-300 font-medium",
                dividerLine: "bg-zinc-800",
                dividerText: "text-zinc-500",
                formFieldLabel: "text-zinc-400",
                formFieldInput: "bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-yellow-500 focus:ring-yellow-500/20",
                formButtonPrimary: "bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-semibold shadow-xl transition-all",
                footerActionText: "text-zinc-400",
                footerActionLink: "text-yellow-500 hover:text-yellow-400 text-sm font-medium",
                identityPreviewText: "text-zinc-300",
                identityPreviewEditButton: "text-yellow-500 hover:text-yellow-400"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
