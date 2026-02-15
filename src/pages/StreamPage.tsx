import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Tv } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Header } from "@/components/Header";
import { categories, Category } from "@/data/mockData";

interface StreamRow {
  id: string;
  match_id: string;
  match_label: string;
  stream_url: string;
  stream_source: string;
}

export default function StreamPage() {
  const { matchId } = useParams();
  const [streams, setStreams] = useState<StreamRow[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("الكل");

  useEffect(() => {
    if (!matchId) return;
    supabase
      .from("match_streams")
      .select("*")
      .eq("match_id", matchId)
      .eq("is_active", true)
      .then(({ data }) => {
        setStreams((data || []) as StreamRow[]);
      });
  }, [matchId]);

  const matchLabel = streams[0]?.match_label || "البث المباشر";
  const videoSources = streams.map((s) => ({
    src: s.stream_url,
    label: s.stream_source,
    type: s.stream_url.includes(".m3u8") ? "application/x-mpegURL" : "video/mp4",
  }));

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header onSearch={() => {}} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/matches" className="text-muted-foreground hover:text-foreground">
            <ArrowRight className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-black font-body">
            <Tv className="inline h-5 w-5 me-1" />
            {matchLabel}
          </h1>
        </div>

        {streams.length > 0 ? (
          <VideoPlayer
            src={videoSources[0].src}
            sources={videoSources}
          />
        ) : (
          <div className="text-center py-20 text-muted-foreground font-body">
            <Tv className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-bold">لا يوجد بث متاح لهذه المباراة</p>
            <p className="text-sm mt-1">يقوم المسؤول بإضافة روابط البث من لوحة التحكم</p>
          </div>
        )}
      </main>
    </div>
  );
}
