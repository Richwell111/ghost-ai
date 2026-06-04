import { SignIn } from "@clerk/nextjs"
import { Cpu, Users, FileText } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden w-1/2 flex-col justify-center bg-[#0f1115] border-r border-[#1a1b1e] p-16 lg:flex">
        <div className="mx-auto max-w-lg space-y-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#00c8d4] text-[#080809] font-bold text-xl">
              G
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-sans">Ghost AI</span>
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white font-sans">
              Design systems at the <br /> speed of thought.
            </h1>
            <p className="text-xl text-[#808090] font-sans">
              Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#00c8d4]/10 border border-[#00c8d4]/20">
                <Cpu className="size-6 text-[#00c8d4]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white font-sans">AI Architecture Generation</h3>
                <p className="text-sm text-[#808090] font-sans">
                  Describe your system, AI maps it to nodes and edges on a live canvas.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#00c8d4]/10 border border-[#00c8d4]/20">
                <Users className="size-6 text-[#00c8d4]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white font-sans">Real-time Collaboration</h3>
                <p className="text-sm text-[#808090] font-sans">
                  Live cursors, presence indicators, and shared node editing across your team.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#00c8d4]/10 border border-[#00c8d4]/20">
                <FileText className="size-6 text-[#00c8d4]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-white font-sans">Instant Spec Generation</h3>
                <p className="text-sm text-[#808090] font-sans">
                  Export a complete Markdown technical spec directly from the canvas graph.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full items-center justify-center bg-[#080809] p-8 lg:w-1/2">
        <SignIn />
      </div>
    </div>
  )
}
