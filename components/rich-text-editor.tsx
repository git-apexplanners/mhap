"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Type,
  Pilcrow,
  Quote,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start typing...',
  minHeight = '400px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  // We use htmlView state but don't need to set it directly as it's controlled by the Tabs component
  const [htmlView] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Update HTML content when switching to HTML view
  useEffect(() => {
    if (htmlView && editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
  }, [htmlView]);

  // Handle content changes in the editor
  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Handle content changes in the HTML view
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
    onChange(e.target.value);
  };

  // Execute a document command
  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleContentChange();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Insert a link
  const insertLink = () => {
    if (linkUrl) {
      const text = linkText || linkUrl;
      execCommand('insertHTML', `<a href="${linkUrl}" target="_blank">${text}</a>`);
      setLinkDialogOpen(false);
      setLinkUrl('');
      setLinkText('');
    }
  };

  // Insert an image
  const insertImage = () => {
    if (imageUrl) {
      execCommand('insertHTML', `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto;" />`);
      setImageDialogOpen(false);
      setImageUrl('');
      setImageAlt('');
    }
  };

  return (
    <div className="border rounded-md">
      <Tabs defaultValue="editor">
        <div className="border-b px-3 py-2 flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="editor" className="p-0">
          <div className="border-b px-3 py-2 flex flex-wrap gap-1">
            {/* Text Formatting */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('bold')}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('italic')}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('underline')}
              title="Underline"
            >
              <Underline className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Alignment */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('justifyLeft')}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('justifyCenter')}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('justifyRight')}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Lists */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('insertUnorderedList')}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('insertOrderedList')}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Headings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Type className="h-4 w-4" />
                  <span>Heading</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => execCommand('formatBlock', '<h1>')}>
                  <Heading1 className="h-4 w-4 mr-2" />
                  Heading 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execCommand('formatBlock', '<h2>')}>
                  <Heading2 className="h-4 w-4 mr-2" />
                  Heading 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execCommand('formatBlock', '<h3>')}>
                  <Heading3 className="h-4 w-4 mr-2" />
                  Heading 3
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execCommand('formatBlock', '<p>')}>
                  <Pilcrow className="h-4 w-4 mr-2" />
                  Paragraph
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execCommand('formatBlock', '<blockquote>')}>
                  <Quote className="h-4 w-4 mr-2" />
                  Blockquote
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => execCommand('formatBlock', '<pre>')}>
                  <Code className="h-4 w-4 mr-2" />
                  Code Block
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Insert */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLinkDialogOpen(true)}
              title="Insert Link"
            >
              <Link className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setImageDialogOpen(true)}
              title="Insert Image"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Undo/Redo */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('undo')}
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => execCommand('redo')}
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <div
            ref={editorRef}
            contentEditable
            className="p-4 focus:outline-none prose max-w-none"
            style={{ minHeight }}
            onInput={handleContentChange}
            onBlur={handleContentChange}
            dangerouslySetInnerHTML={{ __html: value || placeholder }}
          />
        </TabsContent>

        <TabsContent value="html" className="p-0">
          <textarea
            className="w-full p-4 font-mono text-sm focus:outline-none resize-none"
            style={{ minHeight }}
            value={htmlContent}
            onChange={handleHtmlChange}
            placeholder="Enter HTML code here..."
          />
        </TabsContent>
      </Tabs>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>
              Add a URL and optional text for your link.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-text">Text (optional)</Label>
              <Input
                id="link-text"
                placeholder="Link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                If left empty, the URL will be used as the link text.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={insertLink} disabled={!linkUrl}>
              Insert Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Add an image URL and optional alt text.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                placeholder="Image description"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Describe the image for accessibility.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={insertImage} disabled={!imageUrl}>
              Insert Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
