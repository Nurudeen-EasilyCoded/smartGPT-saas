'use client'
import React, { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web'

const CrispChatSupport = () => {
  useEffect(() => {
    Crisp.configure('8196a29d-129d-40df-a320-3f70e2fffea7')
  },[])

  return null
}

export default CrispChatSupport