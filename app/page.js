'use client';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'components/ui/tabs';
import { Bell, Mail, Send } from 'lucide-react';
import NotificationView from './send/page';
import NotificationSend from './notificationsend/page';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none bg-gray-100 p-0">
            <TabsTrigger 
              value="send" 
              className="py-4 data-[state=active]:shadow-none"
            >
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Notification
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="view" 
              className="py-4 data-[state=active]:shadow-none"
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                View Notifications
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="p-6">
            <NotificationSend />
          </TabsContent>

          <TabsContent value="view" className="p-6">
            <NotificationView />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}