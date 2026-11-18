import { useEffect, useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Atom, CalendarDays, Check, CheckCircle2,
  ChevronLeft, ChevronRight, Clock3, Dna, FlaskConical, GraduationCap,
  Leaf, Menu, Search, X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://neat-neet-planner.higgsfield.app/" }],
    meta: [{ property: "og:url", content: "https://neat-neet-planner.higgsfield.app/" }],
  }),
  component: PlannerHome,
});

type Subject = "Physics" | "Chemistry" | "Zoology" | "Botany";
type DayPlan = { date: string; physics: string; chemistry: string; zoology: string; botany: string; note?: string };

const plans: DayPlan[] = [
  {date:"2026-11-19",physics:"Laws of Motion, Part 1",chemistry:"Classification of Elements, Part 1",zoology:"Breathing and Exchange of Gases, Part 1",botany:"Biological Classification, Part 1"},
  {date:"2026-11-20",physics:"Laws of Motion, Part 2",chemistry:"Classification of Elements, Part 2",zoology:"Breathing and Exchange of Gases, Part 2",botany:"Biological Classification, Part 2"},
  {date:"2026-11-21",physics:"Work, Energy and Power, Part 1",chemistry:"Chemical Bonding, Part 1",zoology:"Body Fluids and Circulation, Part 1",botany:"Morphology of Flowering Plants, Part 1"},
  {date:"2026-11-22",physics:"Work, Energy and Power, Part 2",chemistry:"Chemical Bonding, Part 2",zoology:"Body Fluids and Circulation, Part 2",botany:"Morphology of Flowering Plants, Part 2"},
  {date:"2026-11-23",physics:"Laws of Motion, MCQs",chemistry:"Classification, revision and MCQs",zoology:"Breathing, NCERT and MCQs",botany:"Biological Classification, revision"},
  {date:"2026-11-24",physics:"Work, Energy and Power, numerical practice",chemistry:"Chemical Bonding, Part 3",zoology:"Body Fluids, NCERT and MCQs",botany:"Morphology of Flowering Plants, Part 3"},
  {date:"2026-11-25",physics:"Laws of Motion and Work, Energy and Power revision",chemistry:"Chemical Bonding, MCQs",zoology:"Breathing and Body Fluids revision",botany:"Morphology diagrams and MCQs"},
  {date:"2026-11-26",physics:"Physics chapter test",chemistry:"Chemistry chapter test",zoology:"Zoology chapter test",botany:"Botany chapter test"},
  {date:"2026-11-27",physics:"Weak topics and numerical practice",chemistry:"Weak topics and reaction revision",zoology:"Weak topics and NCERT recall",botany:"Weak topics and diagrams"},
  {date:"2026-11-28",physics:"Full Physics revision",chemistry:"Full Chemistry revision",zoology:"Full Zoology revision",botany:"Full Botany revision"},
  {date:"2026-11-29",physics:"AIATS-02 exam",chemistry:"AIATS-02 exam",zoology:"AIATS-02 exam",botany:"AIATS-02 exam",note:"Exam day. Prioritise the test and review mistakes afterwards."},
  {date:"2026-11-30",physics:"Thermal Properties of Matter, Part 1",chemistry:"Solutions, Part 1",zoology:"Neural Control and Coordination, Part 1",botany:"Photosynthesis in Higher Plants, Part 1"},
  {date:"2026-12-01",physics:"Thermal Properties of Matter, Part 2",chemistry:"Solutions, Part 2",zoology:"Neural Control and Coordination, Part 2",botany:"Photosynthesis in Higher Plants, Part 2"},
  {date:"2026-12-02",physics:"Thermodynamics, Part 1",chemistry:"Chemical Kinetics, Part 1",zoology:"Chemical Coordination and Integration, Part 1",botany:"Respiration in Plants, Part 1"},
  {date:"2026-12-03",physics:"Thermodynamics, Part 2",chemistry:"Chemical Kinetics, Part 2",zoology:"Chemical Coordination and Integration, Part 2",botany:"Respiration in Plants, Part 2"},
  {date:"2026-12-04",physics:"Kinetic Theory",chemistry:"Organic Chemistry, Basic Principles",zoology:"Neural Control, NCERT and MCQs",botany:"Photosynthesis, NCERT and MCQs"},
  {date:"2026-12-05",physics:"Oscillations, Part 1",chemistry:"Organic Chemistry, Techniques",zoology:"Chemical Coordination, NCERT and MCQs",botany:"Respiration, NCERT and MCQs"},
  {date:"2026-12-06",physics:"Oscillations, Part 2",chemistry:"Organic Chemistry, MCQs",zoology:"Neural Control revision",botany:"Photosynthesis revision"},
  {date:"2026-12-07",physics:"Waves and numerical practice",chemistry:"Solutions and Chemical Kinetics revision",zoology:"Chemical Coordination revision",botany:"Respiration revision"},
  {date:"2026-12-08",physics:"Full Physics mock and revision",chemistry:"Full Chemistry mock and revision",zoology:"Full Zoology mock and revision",botany:"Full Botany mock and revision"},
  {date:"2026-12-09",physics:"FT-05 exam",chemistry:"FT-05 exam",zoology:"FT-05 exam",botany:"FT-05 exam",note:"Exam day. Review mistakes after the test."},
  {date:"2026-12-10",physics:"System of Particles",chemistry:"Thermodynamics, Part 1",zoology:"Excretory Products and their Elimination, Part 1",botany:"Anatomy of Flowering Plants, Part 1"},
  {date:"2026-12-11",physics:"Rotational Motion",chemistry:"Thermodynamics, Part 2",zoology:"Excretory Products and their Elimination, Part 2",botany:"Anatomy of Flowering Plants, Part 2"},
  {date:"2026-12-12",physics:"Gravitation, Part 1",chemistry:"Equilibrium, Part 1",zoology:"Locomotion and Movement, Part 1",botany:"Plant Kingdom, Part 1"},
  {date:"2026-12-13",physics:"Gravitation, Part 2",chemistry:"Equilibrium, Part 2",zoology:"Locomotion and Movement, Part 2",botany:"Plant Kingdom, Part 2"},
  {date:"2026-12-14",physics:"Mechanical Properties of Solids",chemistry:"Redox Reactions, Part 1",zoology:"Animal Kingdom, Part 1",botany:"Sexual Reproduction in Flowering Plants, Part 1"},
  {date:"2026-12-15",physics:"Mechanical Properties of Fluids, Part 1",chemistry:"Redox Reactions, Part 2",zoology:"Animal Kingdom, Part 2",botany:"Sexual Reproduction in Flowering Plants, Part 2"},
  {date:"2026-12-16",physics:"Mechanical Properties of Fluids, Part 2",chemistry:"Electrochemistry, Part 1",zoology:"Structural Organisation in Animals, Cockroach",botany:"Plant Growth and Development, Part 1"},
  {date:"2026-12-17",physics:"Electric Charges and Fields",chemistry:"Electrochemistry, Part 2",zoology:"Structural Organisation in Animals, Frog",botany:"Plant Growth and Development, Part 2"},
  {date:"2026-12-18",physics:"Electrostatic Potential and Capacitance",chemistry:"Hydrocarbons, Part 1",zoology:"Human Reproduction, Part 1",botany:"Molecular Basis of Inheritance, introduction"},
  {date:"2026-12-19",physics:"Current Electricity",chemistry:"Hydrocarbons, Part 2",zoology:"Human Reproduction, Part 2",botany:"Molecular Basis of Inheritance, DNA replication"},
  {date:"2026-12-20",physics:"Moving Charges and Magnetism",chemistry:"Haloalkanes and Haloarenes, Part 1",zoology:"Reproductive Health",botany:"Principles of Inheritance and Variation, Part 1"},
  {date:"2026-12-21",physics:"Magnetism and Matter",chemistry:"Haloalkanes and Haloarenes, Part 2",zoology:"Chemical Coordination revision",botany:"Principles of Inheritance and Variation, Part 2"},
  {date:"2026-12-22",physics:"Electromagnetic Induction",chemistry:"Alcohols, Phenols and Ethers",zoology:"Neural Control revision",botany:"Molecular Basis of Inheritance revision"},
  {date:"2026-12-23",physics:"Mechanics revision",chemistry:"Aldehydes, Ketones and Carboxylic Acids, Part 1",zoology:"Excretory Products and Locomotion revision",botany:"Anatomy and Plant Kingdom revision"},
  {date:"2026-12-24",physics:"Electricity and Magnetism revision",chemistry:"Aldehydes, Ketones and Carboxylic Acids, Part 2",zoology:"Animal Kingdom and Structural Organisation revision",botany:"Sexual Reproduction and Plant Growth revision"},
  {date:"2026-12-25",physics:"Full Physics syllabus practice",chemistry:"Full Chemistry syllabus practice",zoology:"Human Reproduction and Reproductive Health revision",botany:"Genetics full revision"},
  {date:"2026-12-26",physics:"AIATS-03 Physics mock and revision",chemistry:"AIATS-03 Chemistry mock and revision",zoology:"AIATS-03 Zoology mock and revision",botany:"AIATS-03 Botany mock and revision"},
  {date:"2026-12-27",physics:"AIATS-03 exam",chemistry:"AIATS-03 exam",zoology:"AIATS-03 exam",botany:"AIATS-03 exam",note:"Final target date. Sit AIATS-03 and review your paper."},
];

const subjects: { name: Subject; short: string; icon: typeof Atom; color: string; chapters: string[] }[] = [
  {name:"Physics",short:"PHY",icon:Atom,color:"phy",chapters:["Laws of Motion","Work, Energy and Power","System of Particles and Rotational Motion","Gravitation","Mechanical Properties of Solids","Mechanical Properties of Fluids","Thermal Properties of Matter","Thermodynamics","Kinetic Theory","Oscillations","Waves","Electric Charges and Fields","Electrostatic Potential and Capacitance","Current Electricity","Moving Charges and Magnetism","Magnetism and Matter","Electromagnetic Induction"]},
  {name:"Chemistry",short:"CHEM",icon:FlaskConical,color:"chem",chapters:["Classification of Elements and Periodicity","Chemical Bonding and Molecular Structure","Chemical Thermodynamics","Equilibrium","Redox Reactions","Electrochemistry","Solutions","Chemical Kinetics","Organic Chemistry: Some Basic Principles and Techniques","Hydrocarbons","Haloalkanes and Haloarenes","Alcohols, Phenols and Ethers","Aldehydes, Ketones and Carboxylic Acids"]},
  {name:"Zoology",short:"ZOO",icon:Dna,color:"zoo",chapters:["Breathing and Exchange of Gases","Body Fluids and Circulation","Neural Control and Coordination","Chemical Coordination and Integration","Excretory Products and their Elimination","Locomotion and Movement","Animal Kingdom","Structural Organisation in Animals (Cockroach and Frog)","Human Reproduction","Reproductive Health"]},
  {name:"Botany",short:"BOT",icon:Leaf,color:"bot",chapters:["Biological Classification (Cyanobacteria to Lichen Plants)","Morphology of Flowering Plants","Anatomy of Flowering Plants","Plant Kingdom","Photosynthesis in Higher Plants","Respiration in Plants","Plant Growth and Development","Sexual Reproduction in Flowering Plants","Principles of Inheritance and Variation","Molecular Basis of Inheritance (DNA replication)"]},
];

const exams = [
  {name:"Meridian Test-02",date:"2026-11-08",end:"2026-11-10",kind:"Online",detail:"Work, Energy and Power, System of Particles and Rotational Motion, Gravitation, Mechanical Properties of Solids and Fluids, Chemical Bonding and Molecular Structure, Chemical Thermodynamics, Equilibrium, Redox Reactions, Electrochemistry, Biological Classification, Morphology and Anatomy of Flowering Plants, Plant Kingdom, Breathing and Exchange of Gases, Body Fluids and Circulation, Excretory Products and their Elimination, Locomotion and Movement"},
  {name:"AIATS-02",date:"2026-11-29",kind:"Offline",detail:"Laws of Motion, Work Energy and Power, Classification and Periodicity, Chemical Bonding, Biological Classification, Morphology, Breathing, Body Fluids"},
  {name:"FT-05",date:"2026-12-09",kind:"Offline",detail:"Thermal Properties, Thermodynamics, Kinetic Theory, Oscillations, Waves, Solutions, Chemical Kinetics, Organic Basics, Photosynthesis, Respiration, Neural Control, Chemical Coordination"},
  {name:"AIATS-03",date:"2026-12-27",kind:"Offline",detail:"System of Particles, Rotational Motion, Gravitation, Mechanical Properties of Solids and Fluids, Thermodynamics, Equilibrium, Redox, Electrochemistry, Anatomy, Plant Kingdom, Flowering Plant Reproduction, Animal Kingdom, Excretory Products and their Elimination, Locomotion and Movement, Structural Organisation in Animals (Cockroach and Frog)"},
  {name:"FT-06",date:"2027-01-06",kind:"Offline",detail:"Electric Charges and Fields, Electrostatic Potential and Capacitance, Current Electricity, Hydrocarbons, Haloalkanes and Haloarenes, Plant Growth and Development, Sexual Reproduction, Animal Kingdom, Structural Organisation"},
  {name:"Meridian Test-03",date:"2027-01-10",end:"2027-01-12",kind:"Online",detail:"Thermal Properties, Thermodynamics, Kinetic Theory, Oscillations, Waves, Electric Charges, Electrostatics, Current Electricity, Solutions, Kinetics, Organic Basics, Hydrocarbons, Haloalkanes, Photosynthesis, Respiration, Plant Growth, Sexual Reproduction, Neural and Chemical Coordination, Animal Kingdom, Structural Organisation"},
  {name:"NEET R-02",date:"2027-01-13",kind:"Online CBT",detail:"Gravitation, Mechanical Properties, Thermal Physics, Oscillations, Waves, Electrostatics, Current Electricity, Equilibrium, Redox, Electrochemistry, Solutions, Kinetics, Organic Basics, Hydrocarbons, Haloalkanes, Anatomy, Plant Kingdom, Photosynthesis, Respiration, Plant Growth, Sexual Reproduction, Excretion, Locomotion, Neural and Chemical Coordination, Animal Kingdom, Structural Organisation"},
  {name:"AIATS-04",date:"2027-01-17",kind:"Offline",detail:"Thermal Properties, Thermodynamics, Kinetic Theory, Oscillations, Waves, Solutions, Chemical Kinetics, Organic Basics, Photosynthesis, Respiration, Plant Growth, Chemical Coordination, Animal Kingdom, Structural Organisation"},
  {name:"FT-07",date:"2027-02-03",kind:"Offline",detail:"Moving Charges and Magnetism, Electromagnetic Induction, Alcohols Phenols and Ethers, Aldehydes Ketones and Carboxylic Acids, Principles of Inheritance, Molecular Basis of Inheritance, Human Reproduction, Reproductive Health"},
];

const subjectKeys: { key: Subject; field: "physics"|"chemistry"|"zoology"|"botany"; time: string; hint: string }[] = [
  {key:"Physics",field:"physics",time:"4:30 - 6:15 PM",hint:"Concepts and 20-30 numericals"},
  {key:"Chemistry",field:"chemistry",time:"6:15 - 8:00 PM",hint:"NCERT, reactions and MCQs"},
  {key:"Zoology",field:"zoology",time:"9:00 - 11:00 PM",hint:"NCERT reading, diagrams and MCQs"},
  {key:"Botany",field:"botany",time:"11:00 PM - 1:00 AM",hint:"NCERT reading, diagrams and MCQs"},
];

const dateLabel = (iso: string, opts: Intl.DateTimeFormatOptions = { day:"numeric", month:"short" }) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", opts);
const fullDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
const allChapters = subjects.flatMap((s) => s.chapters.map((chapter) => `${s.name}::${chapter}`));

function PlannerHome() {
  const [selectedDate, setSelectedDate] = useState("2026-11-19");
  const [done, setDone] = useState<string[]>([]);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [activeSubject, setActiveSubject] = useState<Subject>("Physics");
  const [query, setQuery] = useState("");
  const [examExpanded, setExamExpanded] = useState<string | null>("AIATS-02");
  const [mobileNav, setMobileNav] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("neat-planner-progress-v1");
      if (raw) {
        const parsed = JSON.parse(raw) as { done?: string[]; chapters?: string[] };
        setDone(Array.isArray(parsed.done) ? parsed.done : []);
        setCompletedChapters(Array.isArray(parsed.chapters) ? parsed.chapters : []);
      }
    } catch { /* keep a usable fresh planner if storage is unavailable */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { window.localStorage.setItem("neat-planner-progress-v1", JSON.stringify({ done, chapters: completedChapters })); }
    catch { /* progress remains interactive for this visit */ }
  }, [done, completedChapters, loaded]);

  const plan = plans.find((p) => p.date === selectedDate) ?? plans[0];
  const totalSessions = plans.length * 4;
  const totalDone = done.length;
  const overall = Math.round((totalDone / totalSessions) * 100);
  const nextExam = exams.find((exam) => exam.date >= "2026-11-18") ?? exams[0];
  const daysToExam = Math.max(0, Math.ceil((new Date(`${nextExam.date}T12:00:00`).getTime() - new Date("2026-11-18T12:00:00").getTime()) / 86400000));
  const subject = subjects.find((s) => s.name === activeSubject)!;
  const filteredChapters = subject.chapters.filter((chapter) => chapter.toLowerCase().includes(query.toLowerCase()));
  const chapterTotal = allChapters.length;
  const chapterDone = completedChapters.length;
  const activeDayIndex = plans.findIndex((p) => p.date === selectedDate);
  const dateStrip = plans.slice(Math.max(0, Math.min(plans.length - 7, activeDayIndex - 3)), Math.max(0, Math.min(plans.length - 7, activeDayIndex - 3)) + 7);

  const toggleSession = (key: string) => setDone((old) => old.includes(key) ? old.filter((x) => x !== key) : [...old, key]);
  const toggleChapter = (key: string) => setCompletedChapters((old) => old.includes(key) ? old.filter((x) => x !== key) : [...old, key]);
  const jump = (id: string) => { const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; document.getElementById(id)?.scrollIntoView({ behavior:reduce?"auto":"smooth", block:"start" }); setMobileNav(false); };
  const goDate = (offset: number) => { const next = Math.max(0, Math.min(plans.length - 1, activeDayIndex + offset)); setSelectedDate(plans[next].date); };

  return (
    <main className="neat-site">
      <header className="neat-nav" id="top">
        <a className="brand" href="#top" aria-label="NEAT NEET Planner home"><span className="brand-mark">N<span>.</span></span><span className="brand-name">NEAT <b>NEET</b><small>STUDY PLANNER</small></span></a>
        <nav className={mobileNav ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          <button onClick={() => jump("today")}>Today</button><button onClick={() => jump("exam-route")}>Exam route</button><button onClick={() => jump("syllabus")}>Syllabus</button>
        </nav>
        <div className="nav-right"><span className="nav-date">19 NOV <i> / </i> 27 DEC</span><button className="nav-cta" onClick={() => jump("today")}>Open planner <ArrowRight size={15}/></button><button className="mobile-menu" aria-label={mobileNav ? "Close menu" : "Open menu"} onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X/> : <Menu/>}</button></div>
      </header>

      <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />

      <section className="overview section-wrap" aria-labelledby="overview-title">
        <div className="section-intro"><h2 id="overview-title">A route you can<br/><em>actually follow.</em></h2><p>Coaching takes the day. Your study slots take you forward. Keep the plan simple and keep showing up.</p></div>
        <div className="overview-board">
          <div className="overview-top"><span>YOUR DECEMBER TARGET</span><span className="live-mark"><i/> IN PROGRESS</span></div>
          <div className="overview-main"><div><div className="big-number">27<span>DEC</span></div><p>AIATS-03 / FINAL CHECKPOINT</p></div><div className="progress-ring" style={{"--progress":`${overall}%`} as CSSProperties}><div><strong>{overall}%</strong><small>sessions done</small></div></div></div>
          <div className="overview-stats"><div><strong>{plans.length}</strong><span>study days</span></div><div><strong>{chapterTotal}</strong><span>chapters mapped</span></div><div><strong>{exams.length}</strong><span>exam milestones</span></div></div>
          <div className="overview-foot"><span>PROGRESS SAVES ON THIS DEVICE</span><span>{totalDone} / {totalSessions} SESSIONS <ArrowUpRight size={14}/></span></div>
        </div>
      </section>

      <section className="today-section" id="today">
        <div className="section-wrap">
          <div className="today-heading"><div><h2>Today's <em>study plan.</em></h2><p>Coaching first. Focused self-study after. One slot at a time.</p></div><div className="date-badge"><CalendarDays size={17}/><span>19 NOV <b>TO</b> 27 DEC</span></div></div>
          <div className="day-picker"><button className="arrow-button" onClick={() => goDate(-1)} disabled={activeDayIndex===0} aria-label="Previous day"><ChevronLeft/></button><div className="date-scroll">{dateStrip.map((day) => <button key={day.date} onClick={() => setSelectedDate(day.date)} className={selectedDate===day.date ? "date-chip active" : "date-chip"}><small>{dateLabel(day.date,{weekday:"short"}).toUpperCase()}</small><strong>{dateLabel(day.date,{day:"numeric"})}</strong><span>{dateLabel(day.date,{month:"short"}).toUpperCase()}</span></button>)}</div><button className="arrow-button" onClick={() => goDate(1)} disabled={activeDayIndex===plans.length-1} aria-label="Next day"><ChevronRight/></button></div>
          <div className="selected-day"><div><span className="selected-day-label">SELECTED DAY</span><h3>{fullDate(selectedDate)}</h3></div><span className="day-count">DAY {activeDayIndex+1} <i> / </i> 39</span></div>
          {plan.note && <div className="exam-note"><GraduationCap size={18}/><span>{plan.note}</span></div>}
          <div className="routine-grid">
            <div className="routine-rail"><div className="routine-point"><b>08:00 AM</b><span>Wake up</span></div><div className="routine-point"><b>08:00 AM - 03:00 PM</b><span>Coaching classes</span></div><div className="routine-point rest"><b>03:00 - 04:30 PM</b><span>Rest and refresh</span></div><div className="routine-point dinner"><b>08:00 - 09:00 PM</b><span>Dinner break</span></div><div className="routine-point sleep"><b>01:00 AM</b><span>Sleep</span></div></div>
            <div className="study-slots">{subjectKeys.map((item,index) => { const key = `${selectedDate}::${item.key}`; const checked = done.includes(key); const Icon = subjects.find(s=>s.name===item.key)!.icon; return <article key={item.key} className={`study-slot ${item.key.toLowerCase()} ${checked?"is-done":""}`}><div className="slot-index">0{index+1}</div><div className="slot-content"><div className="slot-top"><span className="slot-subject"><Icon size={16}/>{item.key}</span><span className="slot-time"><Clock3 size={13}/>{item.time}</span></div><h4>{plan[item.field]}</h4><p>{item.hint}</p></div><button className={checked?"slot-check checked":"slot-check"} onClick={() => toggleSession(key)} aria-label={`${checked?"Unmark":"Mark"} ${item.key} session complete`}>{checked?<Check size={18}/>:<CheckCircle2 size={18}/>}<span>{checked?"Done":"Mark done"}</span></button></article>; })}</div>
          </div>
          <div className="day-foot"><span><b>{subjectKeys.filter((s)=>done.includes(`${selectedDate}::${s.key}`)).length} of 4</b> study slots completed</span><span>AFTER 1 AM: REST AND RESET</span></div>
        </div>
      </section>

      <section className="exam-section section-wrap" id="exam-route">
        <div className="exam-intro"><h2>Every test has<br/><em>a place.</em></h2><p>Prepare for the December tests first. The January and February syllabus is mapped here too, so you can see what's coming next.</p><div className="countdown-card"><span>NEXT EXAM</span><strong>{daysToExam}<small> DAYS</small></strong><b>{nextExam.name} · {dateLabel(nextExam.date,{day:"numeric",month:"long"})}</b></div></div>
        <div className="exam-list">{exams.map((exam,index)=>{const expanded=examExpanded===exam.name;return <article key={exam.name} className={expanded?"exam-row expanded":"exam-row"}><button className="exam-trigger" onClick={()=>setExamExpanded(expanded?null:exam.name)} aria-expanded={expanded}><span className="exam-index">0{index+1}</span><span className="exam-date"><b>{dateLabel(exam.date,{day:"numeric"})}</b><small>{dateLabel(exam.date,{month:"short"}).toUpperCase()}</small></span><span className="exam-name"><strong>{exam.name}</strong><small>{exam.kind}{exam.end?` · ${dateLabel(exam.date)} to ${dateLabel(exam.end)}`:""}</small></span><span className="exam-arrow">{expanded?<X size={17}/>:<ArrowDown size={17}/>}</span></button>{expanded&&<div className="exam-detail"><p>{exam.detail}</p><span>{exam.date<"2026-11-18"?"PAST TEST":exam.date>"2026-12-27"?"UPCOMING SYLLABUS":"DECEMBER PREPARATION"}</span></div>}</article>})}</div>
      </section>

      <section className="syllabus-section" id="syllabus"><div className="section-wrap"><div className="syllabus-head"><div><div className="eyebrow">THE COMPLETE CHAPTER MAP</div><h2>Know what to<br/><em>cover next.</em></h2><p>Every topic from your shared exam schedule, organised by subject. Tick a chapter when you've completed it.</p></div><div className="syllabus-progress"><div className="syllabus-progress-top"><span>CHAPTER PROGRESS</span><b>{chapterDone} / {chapterTotal}</b></div><div className="progress-track"><i style={{width:`${chapterDone/chapterTotal*100}%`}}/></div><strong>{Math.round(chapterDone/chapterTotal*100)}<small>%</small></strong></div></div>
          <div className="subject-tabs">{subjects.map((s)=>{const Icon=s.icon;const n=s.chapters.filter(c=>completedChapters.includes(`${s.name}::${c}`)).length;return <button key={s.name} onClick={()=>setActiveSubject(s.name)} className={activeSubject===s.name?`subject-tab active ${s.color}`:`subject-tab ${s.color}`}><Icon size={18}/><span>{s.name}</span><small>{n}/{s.chapters.length}</small></button>})}</div>
          <div className="chapter-panel"><div className="chapter-panel-head"><div><span className="chapter-overline">{subject.short} / CHAPTER INDEX</span><h3>{subject.name}</h3></div><label className="chapter-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a chapter" aria-label="Find a chapter"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear search"><X size={14}/></button>}</label></div>
            <div className="chapter-list">{filteredChapters.map((chapter)=>{const key=`${subject.name}::${chapter}`;const checked=completedChapters.includes(key);return <button key={chapter} className={checked?"chapter-row completed":"chapter-row"} onClick={()=>toggleChapter(key)}><span className="chapter-num">{String(subject.chapters.indexOf(chapter)+1).padStart(2,"0")}</span><span className="chapter-title">{chapter}</span><span className="chapter-status">{checked?<><Check size={14}/> COMPLETE</>:"MARK COMPLETE"}</span><span className="chapter-tick">{checked?<Check size={15}/>:"+"}</span></button>})}{filteredChapters.length===0&&<div className="no-results">No chapters match “{query}”. Try another search.</div>}</div>
            <div className="chapter-panel-foot"><span>{filteredChapters.length} CHAPTERS SHOWN</span><span>YOUR PROGRESS IS SAVED ON THIS DEVICE</span></div>
          </div>
        </div></section>

      <section className="closing-section"><div className="closing-mark">N<span>.</span></div><h2>Small steps.<br/><em>Strong finish.</em></h2><p>Keep your routine steady, learn the chapter, practise the questions, and review what went wrong.</p><button className="closing-button" onClick={()=>{setSelectedDate("2026-11-19");jump("today")}}>Open planner <ArrowRight size={16}/></button><div className="closing-date">19 NOVEMBER <span>✳</span> 27 DECEMBER 2026</div></section>
      <footer className="neat-footer"><span>NEAT NEET PLANNER</span><span>MADE FOR THE DAILY WORK.</span><span>2026 / 27</span></footer>
    </main>
  );
}
