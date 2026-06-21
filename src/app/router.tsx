import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'
import { PhoneFrame } from '../components/layout/PhoneFrame'
import { ClientLayout } from './ClientLayout'
import { TrainerLayout } from './TrainerLayout'

import { Landing } from '../screens/Landing'
import { CoachScreen } from '../screens/CoachScreen'

import { ClientHome } from '../screens/client/ClientHome'
import { ClientDiscover } from '../screens/client/ClientDiscover'
import { TrainerProfile } from '../screens/client/TrainerProfile'
import { Subscribe } from '../screens/client/Subscribe'
import { ClientProgram } from '../screens/client/ClientProgram'
import { WorkoutDay } from '../screens/client/WorkoutDay'
import { ClientProgress } from '../screens/client/ClientProgress'
import { MealPlanScreen } from '../screens/client/MealPlanScreen'
import { ChatsHub } from '../screens/client/ChatsHub'
import { AssistantChat } from '../screens/client/AssistantChat'
import { TrainerChat } from '../screens/client/TrainerChat'
import { ClientProfile } from '../screens/client/ClientProfile'
import { Notifications } from '../screens/client/Notifications'

import { TrainerHome } from '../screens/trainer/TrainerHome'
import { TrainerClients } from '../screens/trainer/TrainerClients'
import { TrainerClientDetail } from '../screens/trainer/TrainerClientDetail'
import { TrainerPrograms } from '../screens/trainer/TrainerPrograms'
import { ProgramBuilder } from '../screens/trainer/ProgramBuilder'
import { TrainerFinance } from '../screens/trainer/TrainerFinance'
import { TrainerInbox } from '../screens/trainer/TrainerInbox'
import { TrainerChatDetail } from '../screens/trainer/TrainerChatDetail'
import { TrainerProfileEditor } from '../screens/trainer/TrainerProfileEditor'
import { TrainerAccount } from '../screens/trainer/TrainerAccount'

function RootFrame() {
  return (
    <PhoneFrame>
      <Outlet />
    </PhoneFrame>
  )
}

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RootFrame />}>
          <Route path="/" element={<Landing />} />
          <Route path="/coach/:exerciseId" element={<CoachScreen />} />

          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientHome />} />
            <Route path="discover" element={<ClientDiscover />} />
            <Route path="trainer/:id" element={<TrainerProfile />} />
            <Route path="subscribe/:id" element={<Subscribe />} />
            <Route path="program" element={<ClientProgram />} />
            <Route path="workout/:dayId" element={<WorkoutDay />} />
            <Route path="progress" element={<ClientProgress />} />
            <Route path="meal" element={<MealPlanScreen />} />
            <Route path="chats" element={<ChatsHub />} />
            <Route path="chat/ai" element={<AssistantChat />} />
            <Route path="chat/trainer" element={<TrainerChat />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          <Route path="/trainer" element={<TrainerLayout />}>
            <Route index element={<TrainerHome />} />
            <Route path="clients" element={<TrainerClients />} />
            <Route path="client/:id" element={<TrainerClientDetail />} />
            <Route path="programs" element={<TrainerPrograms />} />
            <Route path="program/:id" element={<ProgramBuilder />} />
            <Route path="finance" element={<TrainerFinance />} />
            <Route path="inbox" element={<TrainerInbox />} />
            <Route path="chat/:id" element={<TrainerChatDetail />} />
            <Route path="profile" element={<TrainerAccount />} />
            <Route path="profile/edit" element={<TrainerProfileEditor />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}
