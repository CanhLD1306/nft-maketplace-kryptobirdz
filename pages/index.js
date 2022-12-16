import { ethers } from "ethers"
import { useEffect, useState } from "react"
import axios from "axios"
import web3modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import KBMarket from "../artifacts/contracts/KBMarket.sol/KBMarket.json";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFTs()
  })

  async function loadNFTs() {
    // what we want to load:
    // provider, tokenContract, marketContract, data for our marketItems

    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, KBMarket.abi, provider)
    const data = await marketContract.fetchMarketItems()
  
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      // we want to get the token metadata - json
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  } 

  // function to buy nfts for market
  async function buyNFT(nft){
    const web3modal = new web3modal()
    const connection = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer)
  
    const price = new ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }
  return (
    <div>
      
    </div>
  )
}