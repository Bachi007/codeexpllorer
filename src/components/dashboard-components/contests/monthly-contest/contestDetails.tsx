import React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ContestDetails = () => (
  <Tabs defaultValue="rules" className="my-4">
    <TabsList>
      <TabsTrigger value="rules">Rules</TabsTrigger>
      <TabsTrigger value="prizes">Prizes</TabsTrigger>
      <TabsTrigger value="faqs">FAQs</TabsTrigger>
      <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
    </TabsList>

    <TabsContent value="rules">
      <h2 className="text-xl font-semibold mb-2">Contest Rules</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Participants must register before the 15th of the month to be eligible.</li>
        <li>Each participant is allowed only one entry.</li>
        <li>Submissions must be original work and not plagiarized.</li>
        <li>All entries must be submitted by 11:59 PM on the last day of the month.</li>
        <li>Judging criteria will include creativity, code quality, and problem-solving skills.</li>
        <li>Winners will be notified via email and announced on the website.</li>
      </ul>
    </TabsContent>

    <TabsContent value="prizes">
      <h2 className="text-xl font-semibold mb-2">Prizes</h2>
      <p>Exciting prizes await the winners of our monthly coding contest!</p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>1st Place:</strong> $500 Amazon Gift Card and a one-year subscription to a coding platform.</li>
        <li><strong>2nd Place:</strong> $300 Amazon Gift Card and a six-month subscription to a coding platform.</li>
        <li><strong>3rd Place:</strong> $100 Amazon Gift Card and a three-month subscription to a coding platform.</li>
        <li><strong>Honorable Mentions:</strong> Exclusive contest merchandise and certificates.</li>
      </ul>
    </TabsContent>

    <TabsContent value="faqs">
      <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions (FAQs)</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Q: Who can participate in the contest?</h3>
          <p>A: The contest is open to developers of all skill levels from around the world.</p>
        </div>
        <div>
          <h3 className="font-semibold">Q: How do I submit my entry?</h3>
          <p>A: After registering, you will receive an email with instructions on how to submit your entry.</p>
        </div>
        <div>
          <h3 className="font-semibold">Q: Can I submit multiple entries?</h3>
          <p>A: No, each participant is allowed only one entry per contest.</p>
        </div>
        <div>
          <h3 className="font-semibold">Q: How will the winners be selected?</h3>
          <p>A: Entries will be judged based on creativity, code quality, and problem-solving skills by a panel of experts.</p>
        </div>
      </div>
    </TabsContent>

    <TabsContent value="leaderboard">
      <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
      <DataTable
        data={[
          { position: 1, name: 'Alice Johnson', points: 95 },
          { position: 2, name: 'Bob Smith', points: 90 },
          { position: 3, name: 'Carol White', points: 85 },
        ]}
        columns={[
          { header: 'Position', accessor: 'position' },
          { header: 'Name', accessor: 'name' },
          { header: 'Points', accessor: 'points' },
        ]}
      />
    </TabsContent>
  </Tabs>
);

export default ContestDetails;
