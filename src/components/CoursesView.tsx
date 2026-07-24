import React, { useState } from 'react';
import { 
  GraduationCap, 
  PlayCircle, 
  CheckCircle2, 
  Award, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  X, 
  Sparkles, 
  ArrowRight,
  Code
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Course, CourseLesson } from '../types';

export const CoursesView: React.FC = () => {
  const { courses, toggleEnrollCourse, completeCourseLesson, userProfile } = useApp();

  const [activeCourse, setActiveCourse] = useState<Course | null>(courses[0] || null);
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(courses[0]?.lessons[0] || null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleLessonSelect = (course: Course, lesson: CourseLesson) => {
    setActiveCourse(course);
    setActiveLesson(lesson);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleQuizSubmit = (courseId: string, lessonId: string) => {
    setQuizSubmitted(true);
    completeCourseLesson(courseId, lessonId);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#11121A] to-slate-900 border border-slate-800 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>TechHub Academy & Certifications</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            E-Learning & Interactive Coding Labs
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            Master Android Java development, local SQLite database mechanics, and cloud security. Complete lessons, pass quizzes, and earn verified TechHub certificates.
          </p>
        </div>
      </div>

      {/* Main Container: Course Selector + Lesson Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Course Cards */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-white px-1">
            Available Courses ({courses.length})
          </h3>

          {courses.map((course) => {
            const isSelected = activeCourse?.id === course.id;
            return (
              <div
                key={course.id}
                onClick={() => {
                  setActiveCourse(course);
                  if (course.lessons.length > 0) setActiveLesson(course.lessons[0]);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#11121A] border-purple-500 shadow-md ring-1 ring-purple-500/30'
                    : 'bg-[#11121A] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold uppercase text-purple-400">
                      {course.level} • {course.duration}
                    </span>
                    <h4 className="font-bold text-xs text-white truncate mt-0.5">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      By {course.instructor}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all"
                          style={{ width: `${course.progressPercent || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-purple-400">
                        {course.progressPercent || 0}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {course.enrolledCount} Students Enrolled
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEnrollCourse(course.id);
                    }}
                    className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                      course.isEnrolled
                        ? 'bg-purple-600/10 text-purple-300 border border-purple-500/20'
                        : 'bg-purple-600 text-white hover:bg-purple-500'
                    }`}
                  >
                    {course.isEnrolled ? 'Enrolled' : 'Enroll Free'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Active Course Reader / Lesson Content */}
        {activeCourse ? (
          <div className="lg:col-span-2 bg-[#11121A] rounded-2xl border border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-6">
            {/* Header / Course Details */}
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-purple-600/10 text-purple-300 rounded-full border border-purple-500/20">
                    {activeCourse.category}
                  </span>
                  <h2 className="text-lg font-black text-white mt-1">
                    {activeCourse.title}
                  </h2>
                </div>

                {/* Certificate Trigger if completed */}
                {activeCourse.progressPercent === 100 && (
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-md animate-pulse"
                    id="btn-view-certificate"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Certificate</span>
                  </button>
                )}
              </div>

              {/* Lessons Syllabus List */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Course Modules & Interactive Lessons
                </h4>
                {activeCourse.lessons.map((lesson, idx) => {
                  const isCurrent = activeLesson?.id === lesson.id;
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonSelect(activeCourse, lesson)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-purple-950/30 border-purple-500 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border-2 border-slate-700 shrink-0"></span>
                        )}
                        <span className="text-xs truncate">
                          {idx + 1}. {lesson.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">
                        {lesson.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Lesson Reader Box */}
            {activeLesson && (
              <div className="p-5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                    <BookOpen className="w-4 h-4" />
                    <span>{activeLesson.title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 uppercase font-bold border border-purple-800">
                    {activeLesson.type}
                  </span>
                </div>

                {/* Lesson Code View */}
                {activeLesson.type === 'code' && activeLesson.codeSnippet && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-300">
                      Study the following native code snippet used in Android SQLite database access:
                    </p>
                    <pre className="p-3 bg-[#090A0F] rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                      <code>{activeLesson.codeSnippet}</code>
                    </pre>
                    <button
                      onClick={() => completeCourseLesson(activeCourse.id, activeLesson.id)}
                      className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md"
                      id="btn-mark-lesson-complete"
                    >
                      Mark Module Complete
                    </button>
                  </div>
                )}

                {/* Quiz View */}
                {activeLesson.type === 'quiz' && activeLesson.quizQuestions && (
                  <div className="space-y-4 text-xs">
                    <p className="font-bold text-slate-200">
                      Module Knowledge Check Quiz
                    </p>
                    {activeLesson.quizQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-2 bg-[#090A0F] p-3.5 rounded-xl border border-slate-800">
                        <p className="font-semibold text-slate-200">
                          Q{qIdx + 1}: {q.question}
                        </p>
                        <div className="space-y-1.5 pl-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedAnswers[qIdx] === optIdx;
                            const isCorrect = q.correctIndex === optIdx;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                                className={`w-full text-left p-2 rounded-lg border text-xs transition-all ${
                                  isSelected
                                    ? 'bg-purple-900/60 border-purple-500 text-white font-bold'
                                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                                } ${
                                  quizSubmitted && isCorrect ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300' : ''
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 flex items-center justify-between">
                      {quizSubmitted && (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Passed Quiz! +50 XP
                        </span>
                      )}
                      <button
                        onClick={() => handleQuizSubmit(activeCourse.id, activeLesson.id)}
                        className="ml-auto px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow-md"
                        id="btn-submit-quiz"
                      >
                        Submit Quiz Answers
                      </button>
                    </div>
                  </div>
                )}

                {/* Reading / Video View */}
                {(activeLesson.type === 'reading' || activeLesson.type === 'video') && (
                  <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                    <p>{activeLesson.contentUrl || 'Reading material and architectural guide for Android development...'}</p>
                    <button
                      onClick={() => completeCourseLesson(activeCourse.id, activeLesson.id)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors shadow-md"
                      id="btn-reading-complete"
                    >
                      Complete Module
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Completion Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-md">
          <div className="bg-[#11121A] rounded-2xl max-w-2xl w-full p-8 border-2 border-amber-500/40 shadow-2xl relative text-center space-y-6">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mx-auto flex items-center justify-center">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-amber-400">
                Official Certificate of Accomplishment
              </p>
              <h2 className="text-2xl font-black text-white mt-1">
                TechHub Academy Zambia
              </h2>
            </div>

            <div className="py-4 border-y border-slate-800 space-y-2">
              <p className="text-xs text-slate-400">This certifies that</p>
              <h3 className="text-xl font-bold text-cyan-400 font-serif">
                {userProfile.fullName}
              </h3>
              <p className="text-xs text-slate-400">
                has successfully completed all modules and practical quizzes in
              </p>
              <p className="text-sm font-bold text-white">
                "{activeCourse?.title}"
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Verified ID: TH-CERT-2026-9921</span>
              <span>Issued: July 2026</span>
            </div>

            <button
              onClick={() => {
                alert('Certificate PDF downloaded successfully!');
                setShowCertificateModal(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl shadow-lg hover:opacity-90 transition-opacity"
              id="btn-download-certificate-pdf"
            >
              Download PDF Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
