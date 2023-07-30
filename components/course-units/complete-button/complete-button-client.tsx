'use client'

import { sample } from 'lodash'
import { CheckCircle, Circle } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { toast } from '../../ui/use-toast'

interface CompleteButtonProps {
  unitId: string
  isCompleted: boolean
  isAuthenticated: boolean
  nextUnitId: string
}

const encouragingMessages = [
  'Keep up the good work!',
  'Getting smarter!',
  'On the path to a nobel prize!',
  'You Einstein, you!',
  'Ice cream yum',
]

export function CompleteButtonClient({
  unitId,
  isCompleted,
  isAuthenticated,
  nextUnitId,
}: CompleteButtonProps) {
  const router = useRouter()

  async function handleClick() {
    if (!isAuthenticated) {
      return router.push('/auth')
    }

    toast({
      title: 'Completed!',
      description: sample(encouragingMessages),
    })

    await fetchComplete({ unitId })

    router.push(`/api/redirect/units/${nextUnitId}`)
  }

  return isCompleted ? (
    <Button variant={'default'} disabled>
      <CheckCircle className="mr-2 w-4" />
      Completed
    </Button>
  ) : (
    <Button variant={'default'} onClick={handleClick}>
      <Circle className="mr-2 w-4" />
      Mark as complete
    </Button>
  )
}

function fetchComplete({ unitId }: { unitId: string }) {
  return fetch(`/api/units/${unitId}/complete`, {
    method: 'POST',
  })
}
