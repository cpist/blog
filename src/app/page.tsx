import Link from "next/link";

export const metadata = {
  title: "CPIST | PhD Applicant",
  description:
    "Compiler, statistics, and language design researcher preparing for PhD applications.",
};

const researchInterests = [
  "Compilers",
  "Statistics",
  "Language Design",
  "LLVM",
  "MLIR",
  "Triton",
  "Program Analysis",
  "Performance Engineering",
];

const publications = [
  {
    title: "Type-Safe IR Transformation Pipelines for MLIR",
    status: "Manuscript in preparation",
    detail: "Focuses on correctness guarantees for multi-level optimization passes.",
  },
  {
    title: "Statistical Debugging Signals for Compiler Optimization Regressions",
    status: "Draft under revision",
    detail: "Explores probabilistic diagnostics for unstable performance outcomes.",
  },
  {
    title: "Paper Reading and Reproducibility Notes",
    status: "Ongoing",
    detail: "Curated notes from systems and PL papers with implementation experiments.",
  },
];

const experience = [
  {
    title: "LLVM and MLIR Optimization Experiments",
    detail:
      "Built and evaluated custom pass pipelines, then documented performance trade-offs in practical case studies.",
  },
  {
    title: "Triton Kernel Prototyping",
    detail:
      "Implemented experimental GPU kernels and benchmarked memory/latency behavior for model workloads.",
  },
  {
    title: "Research Writing and Technical Blogging",
    detail:
      "Maintained a long-form technical blog covering compilers, language tooling, and statistical reasoning.",
  },
];

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden pb-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.13),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(245,158,11,0.12),_transparent_45%)]" />

      <section className="rounded-2xl border border-zinc-200/90 bg-white/95 p-6 shadow-[0_14px_36px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          CPIST
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-700">
          Compiler, statistics, and language design researcher preparing for doctoral study in
          programming languages and systems.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
          I work at the intersection of compiler infrastructure and statistical analysis, with
          hands-on projects in LLVM, MLIR, and Triton. My goal is to design reliable,
          high-performance language systems that are both theoretically grounded and practical.
        </p>

        <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium">
          <Link
            href="/cv"
            className="rounded-full border border-zinc-900 px-4 py-2 text-zinc-900 transition hover:-translate-y-0.5 hover:bg-zinc-900 hover:text-white"
          >
            View CV
          </Link>
          <Link
            href="/posts"
            className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-700 transition hover:-translate-y-0.5 hover:border-zinc-900 hover:text-zinc-900"
          >
            Read Blog Posts
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-zinc-200/90 bg-white/95 p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-zinc-900">Research Interests</h3>
        <p className="mt-2 text-sm text-zinc-600">
          Current focus areas and research themes for PhD-level work.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {researchInterests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-zinc-200/90 bg-white/95 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-zinc-900">Publications and Papers</h3>
            <Link href="/paper" className="text-sm text-zinc-500 underline-offset-4 hover:underline">
              Paper notes
            </Link>
          </div>
          <ul className="mt-5 space-y-4">
            {publications.map((paper) => (
              <li key={paper.title} className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="font-medium text-zinc-900">{paper.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-teal-700">{paper.status}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{paper.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-zinc-200/90 bg-white/95 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-zinc-900">Projects and Experience</h3>
          <ul className="mt-5 space-y-4">
            {experience.map((project) => (
              <li key={project.title} className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="font-medium text-zinc-900">{project.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{project.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-zinc-200/90 bg-white/95 p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-zinc-900">Contact</h3>
        <p className="mt-2 text-sm leading-7 text-zinc-600">
          For research discussions, collaboration, or PhD admissions inquiries, please reach out.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <a
            href="mailto:tinyfrog12@gmail.com"
            className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
          >
            tinyfrog12@gmail.com
          </a>
          <Link
            href="/cv"
            className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
          >
            View CV
          </Link>
        </div>
      </section>
    </div>
  );
}
