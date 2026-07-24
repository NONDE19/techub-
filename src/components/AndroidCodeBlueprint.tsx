import React, { useState } from 'react';
import { 
  Smartphone, 
  Database, 
  Code2, 
  Copy, 
  Check, 
  Layers, 
  FolderTree, 
  Sparkles, 
  ShieldCheck, 
  Download 
} from 'lucide-react';
import { androidJavaDatabaseCode, androidXmlLayoutCode } from '../data/initialData';

export const AndroidCodeBlueprint: React.FC = () => {
  const [copiedCodeType, setCopiedCodeType] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'sqlite' | 'layout' | 'manifest'>('sqlite');

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeType(type);
    setTimeout(() => setCopiedCodeType(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#11121A] to-slate-900 border border-slate-800 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Smartphone className="w-4 h-4" />
            <span>Android Studio Java + SQLite Architecture</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Native Android TechHub Source Code Blueprint
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Production-quality Java, SQLiteOpenHelper, Material 3 XML layout, and AndroidX architecture code. Ready for compilation in Android Studio.
          </p>
        </div>

        <button
          onClick={() => {
            const blob = new Blob([androidJavaDatabaseCode], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'DatabaseHelper.java';
            a.click();
          }}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-lg shadow-md transition-all active:scale-95 shrink-0"
          id="btn-download-java-db-helper"
        >
          <Download className="w-4 h-4" />
          <span>Download DatabaseHelper.java</span>
        </button>
      </div>

      {/* Database Schema Overview (18 Tables) */}
      <div className="bg-[#11121A] p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-sm text-white">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>SQLite Embedded Database Schema (18 Generated Tables)</span>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
            SQLiteOpenHelper v1.0
          </span>
        </div>

        <p className="text-xs text-slate-300">
          The native Android version initializes an embedded local database with complete foreign key constraint cascading and indexed query columns for fast feed scrolling:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px] font-mono font-bold">
          {[
            'Users', 'Profiles', 'Posts', 'Comments', 'Likes', 'Followers',
            'Messages', 'Notifications', 'Skills', 'Projects', 'Jobs', 'Events',
            'Courses', 'Communities', 'Reports', 'Bookmarks', 'SavedPosts', 'Settings'
          ].map((table) => (
            <div
              key={table}
              className="p-2 rounded-xl bg-[#090A0F] border border-slate-800 text-slate-300 text-center"
            >
              tbl_{table.toLowerCase()}
            </div>
          ))}
        </div>
      </div>

      {/* Code Inspector Tabs */}
      <div className="bg-[#090A0F] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Code Bar Tabs */}
        <div className="px-4 py-3 bg-[#11121A] border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {[
              { id: 'sqlite', label: 'DatabaseHelper.java' },
              { id: 'layout', label: 'activity_main.xml' },
              { id: 'manifest', label: 'AndroidManifest.xml' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  activeCodeTab === tab.id
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              handleCopy(
                activeCodeTab === 'sqlite'
                  ? androidJavaDatabaseCode
                  : activeCodeTab === 'layout'
                  ? androidXmlLayoutCode
                  : `<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    package="com.techhub.app">\n    <uses-permission android:name="android.permission.INTERNET" />\n    <application android:name=".TechHubApp" android:theme="@style/Theme.TechHub">\n        <activity android:name=".MainActivity" android:exported="true">\n            <intent-filter>\n                <action android:name="android.intent.action.MAIN" />\n                <category android:name="android.intent.category.LAUNCHER" />\n            </intent-filter>\n        </activity>\n    </application>\n</manifest>`,
                activeCodeTab
              )
            }
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-mono text-xs rounded-lg transition-colors"
            id="btn-copy-android-code"
          >
            {copiedCodeType === activeCodeTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <pre className="p-6 text-xs font-mono text-cyan-300 leading-relaxed overflow-x-auto max-h-[500px]">
          <code>
            {activeCodeTab === 'sqlite' && androidJavaDatabaseCode}
            {activeCodeTab === 'layout' && androidXmlLayoutCode}
            {activeCodeTab === 'manifest' &&
              `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.techhub.app">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:name=".TechHubApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.TechHub">

        <activity
            android:name=".ui.MainActivity"
            android:exported="true"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>
</manifest>`}
          </code>
        </pre>
      </div>
    </div>
  );
};
