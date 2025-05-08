
import React, { Component } from 'react'
import Web3 from 'web3'
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
import WalletConnectProvider from "@walletconnect/web3-provider"
import QRCode from 'qrcode.react';  // Librería para generar el código QR


class App extends Component {

  

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {


    // Asegúrate de que MetaMask esté disponible en el navegador (ya sea en desktop )
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load Token
    const networkId =  web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
   // window.alert(networkId)
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      this.setState({accounts: accounts[0]})
  //    let tokenBalance = await token.methods.balanceOf(accounts[0]).call()
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()

    if (tokenBalance != null) {
      this.setState({ tokenBalance: tokenBalance.toString() })
    }
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    window.alert(networkId)
    if(ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
    } else {
      window.alert('EthSwap contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }else {
    //getBalance();

          // Crea un nuevo proveedor WalletConnect
         // const web3 = new Web3('https://mainnet.infura.io/v3/76624e32adc147a8894211e83952c9ec');
             
    
  }
}
  async loadWeb3() {
   //window.alert(window.ethereum)
    //window.alert(window.web3)
    if (window.ethereum) {
      //window.alert(window.ethereum)
      window.web3 = new Web3(window.ethereum)
     //web3 = new Web3(window.ethereum);
      //window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.0.5:8545'));
      //window.web3 = new Web3(window.ethereum || 'http://192.168.0.5:8545'); 
      if (window.web3) {
          window.alert(`Conectado a la red Ethereum.`);
        } else {
          window.alert(`No Conectado a la red Ethereum.`);
        }
      window.web3.eth.net.isListening().then(() => {
         window.alert(`Bienvenida a Tierra de MarKa: Estas conectada a la red cuentas de Ethereum con ID: KatheVA`);
        })
        .catch(err => {
            //console.error('No se pudo conectar al nodo local:', err);
            window.alert(`aqui no Conectado a la red con ID: ${err}`);
    
        });
        window.web3.eth.net.getId()
        .then(networkId => {
    
       //  window.alert('ENTRO01')
            window.web3.eth.getAccounts().then(accounts => {
        
              this.setState({ account: accounts[0] })
              this.state.account= accounts[0]
              window.alert(this.state.account);
    
    
              window.web3.eth.getBalance(this.state.account).then((balance) => {
                // Convertir el balance de Wei a Ether
           //    
                 window.alert(accounts[0]);
                const weiBalance = window.web3.utils.toWei(balance, 'ether');
                const ethBalance = window.web3.utils.fromWei(weiBalance, 'ether');
                this.setState({ ethBalance })
              //  window.alert(balance);
              });
          
            }).catch(error => {
            //  window.alert('ENTRO02')
              window.alert(error);
            });
    
        //window.alert(networkId)
            const tokenData = Token.networks[5777];  // Token es tu contrato ABI y redes
          //  window.alert(tokenData)
           // window.alert(tokenData)
            if (tokenData) {
            //  window.alert( 'entra ')
                const tokenAddress = tokenData.address;
               //window.alert(tokenAddress);
                // Crear una instancia del contrato Token en esa red
                const token = new window.web3.eth.Contract(Token.abi, tokenAddress);
            
                this.setState({ token })
               // window.alert();
                
               // console.log("Instancia del contrato", tokenContract);
            } else {
                console.error("No se encontró información para el networkId", networkId);
            }
    
        // Load EthSwap
     
        const ethSwapData = EthSwap.networks[5777]
    
        if(ethSwapData) {
         
        //  const ethSwap = new window.web3.eth.Contract(EthSwap.abi, ethSwapData.address)
          const ethSwap = new window.web3.eth.Contract(EthSwap.abi, ethSwapData.address)
          ethSwap.address=ethSwapData.address
        //  window.alert( ethSwap.address)
          this.setState({ ethSwap })
         
        
        } else {
          window.alert('aqio06 EthSwap contract not deployed to detected network.')
        }
    
        this.setState({ loading: false })
    
       // window.alert('AQUI05')
    
        })
        .catch(error => {
           // console.error('Error al obtener el networkId:', error);
            window.alert(`ÀQUI01 NO Conectado a la red con ID:}`+error);
        });
    


   
      //await window.web3.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
         
      const Web3 = require('web3');

///NI127.0.0.1:8545
// Asegúrate de que web3 está conectado al nodo de Ganache o MetaMask
window.web3 = new Web3(window.ethereum || 'http://192.168.0.5:8545');  //
//window.web3 = new Web3(window.ethereum || 'HTTP://192.168.1.100:8545');  // Usar MetaMask o el nodo local

   // window.web3 = new Web3(window.ethereum)
 // const window.web3 = new Web3(new Web3.providers.HttpProvider(uri));
 //window.web3 = new Web3(window.ethereum)

// Asegúrate de que web3 está configurado correctamente
//const web3 = new Web3('http://127.0.0.1:8545');  // Nodo local de Ganache
//window.alert(`aqu`);
// Verificar la conexión
if (window.web3) {
//  window.alert(`Conectado a la red Ethereum.`);
} else {
  window.alert(`No Conectado a la red Ethereum.`);
}


window.web3.eth.net.isListening()

    .then(() => {
    // window.alert(`Bienvenida a SOFTMarKa: Estas conectada a la red cuentas de Ethereum con ID: KatheVA`);
    })
    .catch(err => {
        //console.error('No se pudo conectar al nodo local:', err);
        window.alert(`aqui no Conectado a la red con ID: ${err}`);

    });




/*
// Verifica si tienes el objeto web3 disponible
if (typeof window.ethereum !== 'undefined') {
  // Solicitar permiso para acceder a las cuentas de MetaMask
  window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
      console.log("Cuentas:", accounts);
      window.alert(accounts);
    })
    .catch(error => {
      window.alert(`ddd: ${error}`);
    });
} else {
  window.alert(`dff`);
}
*/


window.web3.eth.net.getId()
    .then(networkId => {

   //  window.alert('ENTRO01')
        window.web3.eth.getAccounts().then(accounts => {
    
          this.setState({ account: accounts[0] })
          this.state.account= accounts[0]
          window.alert(this.state.account);


          window.web3.eth.getBalance(this.state.account).then((balance) => {
            // Convertir el balance de Wei a Ether
       //    
             window.alert(accounts[0]);
            const weiBalance = window.web3.utils.toWei(balance, 'ether');
            const ethBalance = window.web3.utils.fromWei(weiBalance, 'ether');
            this.setState({ ethBalance })
          //  window.alert(balance);
          });
      
        }).catch(error => {
        //  window.alert('ENTRO02')
          window.alert(error);
        });

    //window.alert(networkId)
        const tokenData = Token.networks[5777];  // Token es tu contrato ABI y redes
      //  window.alert(tokenData)
       // window.alert(tokenData)
        if (tokenData) {
        //  window.alert( 'entra ')
            const tokenAddress = tokenData.address;
           //window.alert(tokenAddress);
            // Crear una instancia del contrato Token en esa red
            const token = new window.web3.eth.Contract(Token.abi, tokenAddress);
        
            this.setState({ token })
           // window.alert();
            
           // console.log("Instancia del contrato", tokenContract);
        } else {
            console.error("No se encontró información para el networkId", networkId);
        }

    // Load EthSwap
 
    const ethSwapData = EthSwap.networks[5777]

    if(ethSwapData) {
     
    //  const ethSwap = new window.web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      const ethSwap = new window.web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      ethSwap.address=ethSwapData.address
    //  window.alert( ethSwap.address)
      this.setState({ ethSwap })
     
    
    } else {
      window.alert('aqio06 EthSwap contract not deployed to detected network.')
    }

    this.setState({ loading: false })

   // window.alert('AQUI05')

    })
    .catch(error => {
       // console.error('Error al obtener el networkId:', error);
        window.alert(`ÀQUI01 NO Conectado a la red con ID:}`+error);
    });


// FIB
   
///fin

    }  

  }

  buyTokens = (etherAmount) => {
    
    this.setState({ loading: true })
    this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      window.alert('Enviado a Soft-Mar-Ka exitosamente : '+etherAmount);
     // window.alert('this.state.account:!'+this.state.ethSwap.methods);
    }).on('receipt', function(receipt) {
      //window.alert('SIIthis.state.account:!'+receipt);
    })
    .on('error', function(error) {
      console.error("Error:", error);
      window.alert('SIIthis.state.account:!'+error);
    })
  .catch((error) => {
    window.alert('no'+error);
  });
  }

  sellTokens = (tokenAmount) => {
   // window.alert('afuera token!'+this.state.token )
   // window.alert('afuera address!'+this.state.token.methods)
    if (this.state.token && this.state.token.methods) {
   //   window.alert('entra address!'+tokenAmount) // 41  acounts 5bD
    //  window.alert('ethSwap.address:!'+this.state.ethSwap.address);
    //  window.alert('account:!'+this.state.account);
      this.state.token.methods.approve(this.state.account, tokenAmount).send({ from: this.state.ethSwap.address}).then((receipt) => {
         // window.alert('yes'+receipt);
       //  window.alert('aprobado:!'+this.state.account);
             //  window.alert('tokenAmount:!'+this.state.account);
          this.setState({ loading: true })
        //  this.state.token.methods.approve('0x353c18E9C26fa6aB99C3FbB93B20A1C45B747C9B',tokenAmount).send({from:'0x71Be5028d3288Da3712Be86B6864855F046Ae769' }).on('transactionHash', (hash) => {
         //   window.alert(' 01approve');
         // window.alert('DESPUES DE aprobado:!'+this.state.account);
          
            this.state.ethSwap.methods.sellTokens(tokenAmount).send({ value: tokenAmount, from:this.state.ethSwap.address}).on('transactionHash', (hash) => {
              this.setState({ loading: false })   
                         //
            window.alert('Enviado a Soft-Mar-Ka exitosamente : '+tokenAmount);
            })  
            .catch((hash) => {
              window.alert('no'+hash);
            });
        })
        .catch((receipt) => {
          window.alert('no'+receipt);
        });
    } else {
      window.alert('NO');
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        ethBalance={this.state.ethBalance}
        tokenBalance={this.state.tokenBalance}
        buyTokens={this.buyTokens}
        sellTokens={this.sellTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
