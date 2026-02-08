
{-# LANGUAGE DataKinds           #-}
{-# LANGUAGE ImportQualified     #-}
{-# LANGUAGE NoImplicitPrelude   #-}
{-# LANGUAGE OverloadedStrings   #-}
{-# LANGUAGE TemplateHaskell     #-}
{-# LANGUAGE TypeApplications    #-}
{-# LANGUAGE TypeFamilies        #-}
{-# LANGUAGE TypeOperators       #-}

module SavingsVault where

import           Plutus.V2.Ledger.Api
import           Plutus.V2.Ledger.Contexts
import           PlutusTx.Prelude
import qualified PlutusTx

-- | Datum: Defines the owner and the target goal in Lovelace (1 ADA = 1,000,000 Lovelace)
data SavingsDatum = SavingsDatum
    { owner        :: PubKeyHash
    , targetAmount :: Integer
    }
PlutusTx.unstableMakeIsData ''SavingsDatum

-- | Redeemer: Currently only needs a 'Withdraw' action
data SavingsRedeemer = Withdraw
PlutusTx.unstableMakeIsData ''SavingsRedeemer

{-# INLINABLE mkValidator #-}
mkValidator :: SavingsDatum -> SavingsRedeemer -> ScriptContext -> Bool
mkValidator dat _ ctx = 
    let info = scriptContextTxInfo ctx
        
        -- 1. Check if the withdrawal is signed by the owner
        signedByOwner = txSignedBy info (owner dat)
        
        -- 2. Check if the value at the script address meets the target
        -- In a real scenario, we check the total input value from the script
        scriptInputValue = valueSpent info
        currentBalance = getLovelace (fromValue scriptInputValue)
        targetMet = currentBalance >= targetAmount dat

    in traceIfFalse "Not the owner" signedByOwner && 
       traceIfFalse "Target goal not yet reached" targetMet

-- Boilerplate for script compilation
validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| mkValidator ||])
