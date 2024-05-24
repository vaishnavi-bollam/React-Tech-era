import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VideoCard from '../VideoCard/index'
import Header from '../Header/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      productsData: [],
    })

    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log('home details', fetchedData)

      const updatedData = fetchedData.courses.map(eachVideo => ({
        name: eachVideo.name,
        logoUrl: eachVideo.logo_url,
        id: eachVideo.id,
      }))
      this.setState({
        productsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  btnClicked = () => this.getVideos()

  renderVideosListView = () => {
    const {productsData} = this.state
    return (
      <ul className="videos-container">
        <h1>Courses</h1>
        {productsData.map(each => (
          <VideoCard each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <button type="button" onClick={this.btnClicked}>
        Retry
      </button>
    </div>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderAllVideos()}</div>
      </div>
    )
  }
}

export default Home
