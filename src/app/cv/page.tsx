export const metadata = {
  title: "CV | Jinuk Chung",
  description: "Curriculum Vitae of Jinuk Chung",
};

const education = [
  "The University of Texas at Austin, M.S in Computer Science (Feb 2021 - May 2023)",
  "Yonsei University, B.S in Urban Engineering & B.S in Computer Science (Dual degrees) (Mar 2011 - Feb 2018)",
];

const technicalSkills = [
  "Programming Languages: Python, C/C++, JavaScript, TypeScript, NodeJS, React, SQL, CUDA",
  "CI/CD & Infrastructure: Docker, Kubernetes, Prometheus, Grafana, Helm, Harbor, Jenkins",
  "Static Analysis & Testing: Coverity, OpenCV, Robot Test Framework, Bash (Shell)",
  "Code Management & Tracking: Github, Git/Gerrit, Jira, Confluence, PLM, ALM(Polarion)",
];

const workExperience = [
  "Samsung Electronics DS (Device Solutions), DevOps/MLOps Software Engineer (Mar 2018 - Present)",
  "Built AIOps (MLOps) systems with FastAPI and React for quantized algorithm development and deployment.",
  "Implemented static analysis reporting pipelines and dashboards for Mobile, Automotive AP/CP software.",
  "Developed CI/CD systems for Multi-Domain VM images and integrated MCP Jenkins agents.",
  "Built Docker/Kubernetes environments and reduced setup time by over 80%.",
  "Automated verification in multi-OS environments with OpenCV-based ML approaches (95% automation ratio).",
  "LG CNS, Software Engineer Intern (Jul 2017 - Aug 2017)",
  "Implemented Web UI for automation platform with TypeScript and improved core algorithms.",
];

const projectsAndExperience = [
  "LLVM Project | Open Source Contributor (Jan 2026): Refactored logf16 to a header-only shared math implementation.",
  "Compiler/MLIR optimization experiments and technical blogging on compilers, language tooling, and statistics.",
  "Triton kernel prototyping and performance analysis workflows.",
];

const additionalExperience = [
  "Severance Hospital | Volunteer (Jul 2016 - Dec 2016 / Mar 2017 - Jun 2017)",
  "Republic of Korea Air Force (RoKAF) | Administrative Clerk (Oct 2013 - Jan 2015)",
];

const awards = [
  "Grand Prize (1st Place) - Korean Society of Transportation (Feb 2016)",
  "Gold Award (1st Place) - Individual Category, DX Award by the AP S/W Team, Samsung Electronics",
  "Silver Award - Group Category, DX Award by the SOC Business Team, Samsung Electronics",
];

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-zinc-200/90 bg-white/95 p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-7 text-zinc-700">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function CvPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-200/90 bg-white/95 p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-zinc-900">Jinuk Chung</h1>
        <p className="mt-2 text-sm text-zinc-700">tinyfrog12@gmail.com</p>
      </section>

      <Section title="Education" items={education} />
      <Section title="Technical Skills" items={technicalSkills} />
      <Section title="Work Experience" items={workExperience} />
      <Section title="Projects and Experience" items={projectsAndExperience} />
      <Section title="Additional Experience" items={additionalExperience} />
      <Section title="Awards & Certifications" items={awards} />
    </div>
  );
}
