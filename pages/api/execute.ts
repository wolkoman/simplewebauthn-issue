// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateRegistrationOptions } from '@simplewebauthn/server';
import type { NextApiRequest, NextApiResponse } from 'next'

const rpName = 'SimpleWebAuthn Example';
const rpID = 'simplewebauth-issue.vercel.app';
const origin = `https://${rpID}`;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    const options = generateRegistrationOptions({
      rpID,
      rpName,
      userID: 'userId',
      userName: 'username',
      attestationType: 'none',
    });
    res.status(200).json({ options })
  }catch(e){
    res.status(500).json(e)
  }

}
