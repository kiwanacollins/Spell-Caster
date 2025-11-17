"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { useNotificationStore } from "@/lib/store";

export function AdminInsightsEditor() {
  const { success, error } = useNotificationStore();
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", frequency: "daily", previewText: "" });
  const [generatingAI, setGeneratingAI] = useState(false);

  async function fetchInsights() {
    setLoading(true);
    try {
      const res = await fetch('/api/insights');
      const json = await res.json();
      setInsights(json.data || []);
    } catch (err) {
      console.error(err);
      error('Failed to load insights');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInsights();
  }, []);

  async function handleCreate() {
    if (!form.title || !form.content) return error('Title and content required');
    setLoading(true);
    try {
      const res = await fetch('/api/insights', { method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error('Create failed');
      const json = await res.json();
      setInsights([json.data, ...insights]);
      setForm({ title: '', content: '', frequency: 'daily', previewText: '' });
      success('Insight created');
    } catch (err) {
      console.error(err);
      error('Failed to create insight');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateAI() {
    try {
      setGeneratingAI(true);
      const res = await fetch('/api/ai/generate-insight', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ frequency: form.frequency }) });
      if (!res.ok) throw new Error('AI failed');
      const json = await res.json();
      const data = json.data;
      setForm({ ...form, title: data.title || form.title, content: data.content || form.content, previewText: data.content ? (data.content.slice(0, 160)) : form.previewText });
      success('Generated content successfully. Review and save.');
    } catch (err) {
      console.error(err);
      error('AI generation failed');
    } finally {
      setGeneratingAI(false);
    }
  }

  async function handleSetActive(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/insights/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: true }) });
      if (!res.ok) throw new Error('Failed to set active');
      success('Insight activated');
      await fetchInsights();
    } catch (err) {
      console.error(err);
      error('Failed to activated insight');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete insight?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/insights/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('delete failed');
      success('Deleted');
      await fetchInsights();
    } catch (err) {
      console.error(err);
      error('Failed to delete');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#8B6F47] bg-white p-4">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp']">Mystical Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: (e.target as HTMLInputElement).value })} placeholder="Title" />
            <Select onValueChange={(v) => setForm({ ...form, frequency: v as any })}>
              <SelectTrigger className="border-[#8B6F47]"> <SelectValue placeholder="Frequency" /> </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Input value={form.previewText} onChange={(e) => setForm({ ...form, previewText: (e.target as HTMLInputElement).value })} placeholder="Short preview (optional)" />
          </div>
          <div className="mt-4">
            <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: (e.target as HTMLTextAreaElement).value })} placeholder="Full guidance content (Markdown allowed)" rows={6} />
          </div>

            <div className="flex gap-2 mt-4">
            <Button onClick={handleGenerateAI} disabled={generatingAI} variant="outline">{generatingAI ? 'Generating...' : 'Generate with AI'}</Button>
            <Button onClick={handleCreate} className="bg-[#2C5530] hover:bg-[#1a3621] text-[#F4E8D0]">{loading ? 'Saving...' : 'Create Insight'}</Button>
            <Button variant="outline" onClick={() => setForm({ title: '', content: '', frequency: 'daily', previewText: '' })}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-[#8B6F47] bg-white p-4">
        <CardHeader>
          <CardTitle>Existing Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insights.map((ins) => (
                  <TableRow key={ins._id?.toString()} className="hover:bg-[#F9F3E8] transition-colors">
                    <TableCell>{ins.title}</TableCell>
                    <TableCell>{ins.frequency}</TableCell>
                    <TableCell className="text-xs text-[#4A4A4A]">{ins.previewText}</TableCell>
                    <TableCell>
                      {ins.active ? <Badge className="bg-[#2C5530] text-white">Active</Badge> : <Badge className="bg-[#F4E8D0] text-[#1A1A1A] border border-[#8B6F47]">Inactive</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {!ins.active && (<Button onClick={() => handleSetActive(ins._id?.toString())} variant="ghost">Set Active</Button>)}
                        <Button onClick={() => handleDelete(ins._id?.toString())} variant="destructive"><FiTrash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
