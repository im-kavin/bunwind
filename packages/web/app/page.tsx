"use client";

import { Button, Input, Label } from "@bunwind/ui";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  return (
    <main className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Bunwind Components</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">UI Package Components</h2>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="Enter your email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} 
            />
          </div>
          
          <Button 
            onClick={() => toast.success("Action completed!", {
              description: "Your request was processed successfully."
            })}
          >
            Show Toast
          </Button>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Web Package Components</h2>
        
        <div className="space-y-6">
          <Alert>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an alert component from the web package.
            </AlertDescription>
          </Alert>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Example</DialogTitle>
                <DialogDescription>
                  This is a dialog component from the web package.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>Dialog content goes here. You entered: {inputValue || "nothing yet"}</p>
              </div>
              <DialogFooter>
                <Button onClick={() => toast.info("Dialog action")}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="flex gap-4">
            <Button 
              variant="destructive"
              onClick={() => toast.error("Something went wrong")}
            >
              Error Toast
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast.info("Just FYI")}
            >
              Info Toast
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}