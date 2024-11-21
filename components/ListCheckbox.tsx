'use client'

import React, { useEffect, useState } from 'react'
import { MultiSelect } from "@/components/ui/multi-select"
import UrlConfig from '@/util/config'

interface Specification {
  label: string
  value: number
}

export default function ListCheckbox({ onSpecChange }: { onSpecChange: (values: number[]) => void }) {
  const [specifications, setSpecifications] = useState<Specification[]>([])
  const [selectedValues, setSelectedValues] = useState<number[]>([])

  useEffect(() => {
    fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/specifications/`)
      .then(response => response.json())
      .then(data => {
        const formattedOptions = data.map((spec: any) => ({
          label: spec.type_specification,
          value: spec.id
        }))
        setSpecifications(formattedOptions)
      })
      .catch(error => {
        console.error('Error fetching specifications:', error)
      })
  }, [])

  const handleChange = (values: number[]) => {
    setSelectedValues(values)
    onSpecChange(values)
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Specifications</h3>
      <MultiSelect
        values={selectedValues}
        options={specifications}
        onChange={handleChange}
        placeholder="Select specifications"
      />
    </div>
  )
}
