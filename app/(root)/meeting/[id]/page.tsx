'use client'

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import Loader from '@/components/Loader'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

const Meeting = () => {
  const { id } = useParams()
  const { user, isLoaded } = useUser()
  const { call, isCallLoading } = useGetCallById(id || '')
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  if (!isLoaded || isCallLoading) return <Loader />

  const notAllowed =
    call?.type === 'invited' &&
    (!user || !call.state.members.find((m) => m.user.id === user.id))

  if (notAllowed) return toast('You are not allowed to join this meeting')

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
