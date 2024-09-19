// import MonthlyContest from '@/components/dashboard-components/contests/monthly-contest/monthly-contest'
import ContestDetails from '@/components/dashboard-components/contests/monthly-contest/contestDetails'
import ContestOverview from '@/components/dashboard-components/contests/monthly-contest/contestOverview'
import CountdownTimer from '@/components/dashboard-components/contests/monthly-contest/countDownTimer'
import PastContestHighlights from '@/components/dashboard-components/contests/monthly-contest/pastContestHighights'

import React from 'react'

function page() {
  return (
    // <MonthlyContest/>
    <>
    <div className="container mx-auto p-4">
      <ContestOverview />
       <ContestDetails />
     <CountdownTimer />
           <PastContestHighlights />
   </div>
   </>
  )
}

export default page